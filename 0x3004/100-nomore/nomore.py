# -*- coding: utf-8 -*-
from flask import Flask,request,make_response
from flup.server.fcgi import WSGIServer 
from flask.ext.pymongo import PyMongo
import os
import sys
from json import loads,dumps
from base64 import b64encode,b64decode

app = Flask(__name__)
mongo = PyMongo(app)
DIR = os.path.dirname(os.path.realpath(__file__))

@app.route('/',methods=['POST'])
def index():
	HTML  = """<html>
		<title>NoMore</title>
		<body><pre>
		<form action='./login' method='POST'>
		Username: <input type=text name=user />
		Password: <input type=password name=pass />
		<input type=submit value=Login />
		</form>
		</pre></body>
		</html>"""
	if 'auth' not in request.form:
		return HTML
	else:
		print "AUTH"
		try:
			auth = request.form['auth']
			print '[DEBUG]',auth
			#auth = loads(auth)
			print '[DEBUG]',auth
			x = mongo.db.users.find_one({'$where':auth})
			print x
			return repr(x)
		except Exception as e:
			return str(e)

@app.route('/login',methods=['POST'])
def login():
	username = request.form['user']
	password = request.form['pass']
	login =  mongo.db.users.find_one({'username':username,'password':password})
	if login:
		return 'OK'


if __name__ == "__main__":
	if(sys.argv[1]=='test'):
		app.run(host='0.0.0.0',port=4000,debug=False)
	else:
		PORT = 14000
		print '------------------------'
		print 'Running on port',int(PORT)
		WSGIServer(app, multithreaded=True,bindAddress=('0.0.0.0',int(PORT))).run()