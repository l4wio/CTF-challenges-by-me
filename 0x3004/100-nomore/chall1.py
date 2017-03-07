from flask import Flask,request,render_template,abort,session,redirect,url_for
from flask.ext.pymongo import PyMongo
import json
import sys
from flup.server.fcgi import WSGIServer

app = Flask(__name__)
mongo = PyMongo(app)
app.config['MONGO_DBNAME'] = 'chall1'

@app.route('/',methods=['GET'])
def index():
	if not 'username' in session:
		return render_template('login.html')
	else:
		return render_template('index.html',username=session['username'])

@app.route('/login',methods=['POST'])
def login():
	try:
		username = request.form['username']
		auth = json.loads(request.form['auth'])
		query = {'username':username,'auth':auth}
		print 'Query:',query
		login_ = mongo.db.login.find_one(query)
		open('log.txt','a').write("Login: "+str(query)+"\r\n-----------------\r\n")
		print login_
		if login_:
			session['username'] = login_['username']
			return redirect(url_for('index'))
		else:
			return "<h1>Wrong username or password!</h1>"
	except Exception as e:
		return str(e)

@app.route("/search/<col>/<search>",methods=['GET'])
def search(col,search):
	try:
		if not 'username' in session:
			return redirect(url_for('index'))
		else:
			if session['username'] != 'admin':
				return "<h1>Access denied!</h1>"
		info = mongo.db.login.find_one({col:search})
		open('log.txt','a').write("Search: "+col+" / "+search+"\r\n-----------------\r\n")
		return render_template('result.html',info=info)
	except Exception as e:
		return str(e)

app.secret_key = '\xc7(@\x7fZ\rr\xb9\x8e\x17\xc1\xe1\xd5\x1e\x15.\xcd\x03\x86\rT\x1aw\xa1'
if __name__ == "__main__":
	if(sys.argv[1]=='test'):
		app.run(host='0.0.0.0',port=4000,debug=False)
	else:
		PORT = 40001
		print '------------------------'
		print 'Running on port',int(PORT)
		WSGIServer(app, multithreaded=True,bindAddress=('0.0.0.0',int(PORT))).run()
