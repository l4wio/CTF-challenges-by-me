# -*- coding: utf-8 -*-
from flask import Flask,request,render_template,abort,session,redirect,url_for,make_response
import sys
import sqlite3
from flup.server.fcgi import WSGIServer 
from base64 import b64encode,b64decode
from json import dumps,loads
from hashlib import md5
from time import time


app = Flask(__name__)

VERIFY = (('guest','guest'),('admin','0x3004{muy_bueno!}'))
APP_URL = '/'
DEBUG_URL_FORMAT = 'http://challenges.wargame.vn:50004/debug/'
#DEBUG_URL_FORMAT = 'http://localhost:4000/debug/'
WRONG_CRE = 'Wrong credentials :-('

def db_init():
	conn = sqlite3.connect('database/app.sqlite3')
	conn.text_factory = str
	return conn

def insert_update_db(query,param):
	conn = db_init()
	c = conn.cursor()
	c.execute(query,param)
	conn.commit()
	c.close()

def fetch_one_db(query,param=()):
	conn = db_init()
	c = conn.cursor()
	c.execute(query,param)
	row = c.fetchone()
	c.close()
	return row

def fetch_all_db(query,param=()):
	conn = db_init()
	c = conn.cursor()
	c.execute(query,param)
	row = c.fetchall()
	c.close()
	return row



@app.route('/')
def index():
	if 'username' in request.cookies and 'password' in request.cookies:
		username = request.cookies.get('username')
		password = request.cookies.get('password')
		login_cre = (username,password)
		if login_cre in VERIFY:
			return render_template('index.html',username=username)

	return render_template('index.html')

@app.route('/login',methods=['POST'])
def login():
	username = request.form['username']
	password = request.form['password']
	if (username,password) in VERIFY:
		resp = make_response(redirect('/'))
		from time import time
		time_ = int(time())+3600*10
		resp.set_cookie('username',username,path='/',expires=time_)
		resp.set_cookie('password',password,path='/',expires=time_)
		return resp
	else:
		return render_template('index.html',error='Wrong username or password!')

@app.route('/logout')
def logout():
	resp = make_response(redirect('/'));
	resp.set_cookie('username','',expires=0); 
	resp.set_cookie('password','',expires=0); 
	return resp

@app.route('/make_template',methods=['POST'])
def make_template():
	html = request.form['html']
	param = request.form['param']
	from os import urandom
	md5_id = md5(urandom(24)).hexdigest()
	insert_update_db('INSERT INTO data_templates VALUES(?,?,?,?)'
		,(md5_id,request.remote_addr,html,param))
	return redirect('/template/{0}'.format(md5_id))

@app.route('/template/<id_tmp>')
def template(id_tmp):
	row = fetch_one_db('SELECT html,param FROM data_templates WHERE id = ?',(id_tmp,))
	if row:
		return render_template('template.html',html=row[0],param=row[1],tmpid=id_tmp)
	else:
		return '?'

@app.route('/debug/<id_tmp>')
def debug(id_tmp):
	row = fetch_one_db('SELECT html,param FROM data_templates WHERE id = ?',(id_tmp,))
	if row:
		resp = make_response(render_template('template.html',html=row[0],param=row[1]))
		resp.headers['Content-Type'] = 'text/plain'
		return resp
	else:
		return '?'

@app.route('/feedback',methods=['GET','POST'])
def feedback():
	if request.method == 'GET':
		if 'username' in request.cookies and 'password' in request.cookies:
			username = request.cookies.get('username')
			password = request.cookies.get('password')
			login_cre = (username,password)
			if login_cre in VERIFY:
				return render_template('index.html',username=username,feedback=1)
		return redirect("/")
	elif request.method == 'POST':
		debug_url = request.form['debugurl']
		print debug_url,DEBUG_URL_FORMAT
		if debug_url.startswith(DEBUG_URL_FORMAT):
			from time import time
			insert_update_db('INSERT INTO feedback VALUES(null,?,?,0,?)',(request.remote_addr,debug_url,int(time())))
			return "Thank you ❤ :* !"
		return 'Do not remember what i said ?'

@app.route('/adminnnnn______________secrettttttt',methods=['GET'])
def admin_viewlink():
	resp = make_response('')
	for c in request.cookies.iteritems():
		#c[0],c[1]
		resp.set_cookie(c[0],'',expires=0)
	row = fetch_one_db('SELECT * FROM feedback WHERE active = 0 ORDER BY id DESC')
	if row:
		resp = make_response(redirect(row[2]))
		insert_update_db('UPDATE feedback SET active = 1 WHERE id = ?',(row[0],))
		resp.set_cookie('username',VERIFY[1][0],path='/')
		resp.set_cookie('password',VERIFY[1][1],path='/')
	
		return resp
	return resp
if __name__ == "__main__":
	import os
	DIR = os.path.dirname(os.path.realpath(__file__))
	import logging
	from logging.handlers import RotatingFileHandler
	handler = RotatingFileHandler(DIR+'/log/error.log', maxBytes=1024*1024*123, backupCount=3)
	handler.setLevel(logging.INFO)
	app.logger.addHandler(handler)
	if(sys.argv[1]=='test'):
		app.run(host='0.0.0.0',port=4000,debug=True)
	else:
		PORT = 40004
		print '------------------------'
		print 'Running on port',int(PORT)
		WSGIServer(app, multithreaded=True,bindAddress=('0.0.0.0',int(PORT))).run()
