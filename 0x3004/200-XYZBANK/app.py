# -*- coding: utf-8 -*-
from flask import Flask,request,render_template,abort,session,redirect,url_for,make_response
import sys
from flup.server.fcgi import WSGIServer 
from flaskext.mysql import MySQL
from base64 import b64encode,b64decode
from json import dumps,loads

mysql = MySQL()
app = Flask(__name__)
app.config['MYSQL_DATABASE_USER'] = '0x3004_web200_1'
app.config['MYSQL_DATABASE_PASSWORD'] = '0x3004_web200_1aaa'
app.config['MYSQL_DATABASE_DB'] = '0x3004_web200_1'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

PARAMS = ('username','password','pin')
TABLE_USERS = 'users_test1'
APP_URL = 'web200_hihi'
WRONG_CRE = 'Wrong credentials :-('



def db_init():
	return mysql.connect()

def fetch_one_db(query,param=()):
	conn = db_init()
	c = conn.cursor()
	c.execute(query,param)
	row = c.fetchone()
	c.close()
	return row


def login_query(params):
	return fetch_one_db(
			'SELECT * FROM {0} WHERE username=%s AND password=%s AND pin=%s'.format(TABLE_USERS)
			,params)

@app.route('/',methods=['GET'])
def index():
	if 'credential' in request.cookies:
		return redirect('/info')
	return render_template('index.html')

@app.route('/logout')
def logout():
	resp = make_response(redirect('/'));
	resp.set_cookie('credential','',expires=0); 
	return resp

@app.route('/login',methods=['POST'])
def login():
	login_credential = list(request.form[i] for i in PARAMS) # get POST params
	if len(login_credential) != 3: render_template('index.html',error=u'Not enough parameters :-)')
	app.logger.warning('[DEUBG] login: %s -> %s' % (request.remote_addr,str(login_credential)))
	signin = login_query(login_credential)
	if signin is None:
		return render_template('index.html',error=WRONG_CRE,charset='utf-8')
	resp = make_response(redirect('/info'))
	resp.set_cookie('credential',b64encode(dumps(login_credential))) 
	return resp
	
@app.route('/info',methods=['GET'])
def info():

	try: credential = loads(b64decode(request.cookies.get('credential')))
	except:	credential = []
	if len(credential) != 3: return redirect('/logout')
	app.logger.warning('[DEUBG] info: %s -> %s' % (request.remote_addr,str(b64decode(request.cookies.get('credential')))))
	info = login_query(credential)
	app.logger.warning('--> Result: %s' % str(info))
	if info is None:
		return render_template('index.html',error=WRONG_CRE)
	if info[0] == 'admin':
		flag = 'Good boy! 0x3004{%s}' % info[1] # Flag is an admin's password
	else:
		flag = 'nope...no flag for you'
	return render_template('index.html',username=info[0],pin=str(info[2])[:2]+'**',balance=info[3],flag=flag)



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
		PORT = 40003
		print '------------------------'
		print 'Running on port',int(PORT)
		WSGIServer(app, multithreaded=True,bindAddress=('0.0.0.0',int(PORT))).run()