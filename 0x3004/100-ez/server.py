# -*- coding: utf-8 -*-
from flask import Flask,request,render_template,abort,session,redirect,url_for,make_response
import sys
import sqlite3
from flup.server.fcgi import WSGIServer 
from base64 import b64encode,b64decode
from json import dumps,loads
from hashlib import md5
from time import time
import subprocess
import os

app = Flask(__name__)
DIR = os.path.dirname(os.path.realpath(__file__))

@app.route('/<options>/<value>')
def index(options,value):
	options = '-'+options[:7]
	value = value[:10].replace('.','')
	print '[DEBUG] %s / %s' % (options,value)
	result = subprocess.Popen(['python',os.path.join(DIR,'ez.py'),options,os.path.join(DIR+'/data/',value)],stdout=subprocess.PIPE).communicate()
	resp = make_response(result[0])
	resp.headers['content-type'] = 'text/plain'
	return resp

if __name__ == "__main__":
	if(sys.argv[1]=='test'):
		app.run(host='0.0.0.0',port=4000,debug=True)
	else:
		PORT = 40000
		print '------------------------'
		print 'Running on port',int(PORT)
		WSGIServer(app, multithreaded=True,bindAddress=('0.0.0.0',int(PORT))).run()
