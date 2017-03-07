#!/usr/bin/python

from flask import Flask
from flask import request
import sqlite3
from re import sub
import os


def addslashes(s):
    d = {'"':'\\"', "'":"\\'", "\0":"\\\0", "\\":"\\\\"}
    return ''.join(d.get(c, c) for c in s)

def filter(s):
    for c in s:
        if ord(c) <= 32 or ord(c) >= 127: return 'guest'
    s = sub(r'[\'|\(|\)|\/|\*]','',s)
    return addslashes(s)


app = Flask(__name__)

ROOT = os.path.dirname(os.path.realpath(__file__))
_FLAG_ = open(os.path.join(ROOT,'flag'),'rb').read()

BODY_HTML = """
<link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/darkly/bootstrap.min.css" rel="stylesheet" integrity="sha384-S7YMK1xjUjSpEnF4P8hPUcgjXYLZKK3fQW1j5ObLSl787II9p8RO9XUGehRmKsxd" crossorigin="anonymous">
<title>Tower-X-Tower-level02</title>
<div class="container">
<p style="text-align: center"><a href='/'><img src='http://final.svattt.org/images/tower.png' width=200 height=319 /></a></p>
{}
</div>
"""

INDEX_HTML = BODY_HTML.format("""
      <h3>Login</h3>
      <form class="form-horizontal" method=GET action='/login'>
        <div class="form-group">
          <label class="control-label col-sm-2" for="uname">Username:</label>
          <div class="col-sm-5">
            <input type="text" class="form-control" id="uname" name="username" placeholder="Enter Username">
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-2" for="pwd">Password:</label>
          <div class="col-sm-5">
            <input type="password" class="form-control" id="pwd" name="password" placeholder="Enter password">
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-5">
            <button type="submit" class="btn btn-default">Submit</button>
          </div>
        </div>
      </form>

      <hr>
      <h3>Register</h3>
      <form class="form-horizontal" method=GET action='/register'>
        <div class="form-group">
          <label class="control-label col-sm-2" for="uname">Username:</label>
          <div class="col-sm-5">
            <input type="text" class="form-control" id="uname" name="username" placeholder="Enter Username">
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-2" for="email">Email:</label>
          <div class="col-sm-5">
            <input type="email" class="form-control" id="email" name="email" placeholder="Enter email">
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-2" for="qa">Security Question & Answer:</label>
          <div class="col-sm-5">
            <input type="text" class="form-control" id="qa" name="qa" placeholder="Enter your question and answer for recovering a password when you lost it.">
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-5">
            <button type="submit" class="btn btn-default">Submit</button>
          </div>
        </div>
      </form>

      <hr>
      <h3>Change password</h3>
      <form class="form-horizontal" method=GET action='/change'>
        <div class="form-group">
          <label class="control-label col-sm-2" for="uname">Username:</label>
          <div class="col-sm-5">
            <input type="text" class="form-control" id="uname" name="username" placeholder="Enter Username">
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-2" for="password">Old password:</label>
          <div class="col-sm-5">
            <input type="password" class="form-control" id="password" name="password" placeholder="Enter your old password">
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-5">
            <button type="submit" class="btn btn-default">Submit</button>
          </div>
        </div>
      </form>

      <hr>
      <h3>Forgot</h3>
      <form class="form-horizontal" method=GET action='/forgot'>
        <div class="form-group">
          <label class="control-label col-sm-2" for="uname">Username:</label>
          <div class="col-sm-5">
            <input type="text" class="form-control" id="uname" name="username" placeholder="Enter Username">
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-2" for="email">Email:</label>
          <div class="col-sm-5">
            <input type="email" class="form-control" id="email" name="email" placeholder="Enter email">
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-2" for="qa">Security Question & Answer:</label>
          <div class="col-sm-5">
            <input type="text" class="form-control" id="qa" name="qa" placeholder="Enter your question and answer for recovering a password when you lost it.">
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-5">
            <button type="submit" class="btn btn-default">Submit</button>
          </div>
        </div>
      </form>
    """)

def gen_passcode(s):
  from time import time
  from hashlib import md5
  return md5(str(time())+s).hexdigest()

def init_db():
  conn = sqlite3.connect(os.path.join(ROOT,'tower4.db'))
  conn.row_factory = sqlite3.Row
  c = conn.cursor()

  default_table = """CREATE TABLE IF NOT EXISTS `users`
    (
      username varchar(255),
      qa varchar(255),
      password varchar(255),
      email varchar(255)
    )
    """
  c.execute(default_table)

  query = "SELECT 1 FROM users WHERE username='admin'"
  result = c.execute(query)

  if not result.fetchone():
    u = 'admin'
    e = 'admin@lzw.io'

    query = "INSERT INTO users VALUES('{u}','{qa}','{p}','{e}')"
    query = query.format(
      u=u,
      qa=open(os.path.join(ROOT,'my_secret_you_dont_know_do_you'),'r').read(),
      p=gen_passcode(u+'|'+e),
      e=e)
    c.execute(query)

  conn.commit()
  return conn

@app.route("/",)
def index():
    if request.args.get('source') == '1':
      from cgi import escape
      return BODY_HTML.format('<pre>{}</pre>'.format(escape(open(os.path.join(ROOT,__file__),'rb').read()).encode('ascii', 'xmlcharrefreplace'))
)
    return INDEX_HTML

@app.route("/login",methods=['GET'])
def login():
    username = filter(request.args.get('username'))[:10]
    password = filter(request.args.get('password'))

    if username != '' and password != '':
        conn = init_db()
        c = conn.cursor()
        query = "SELECT * FROM users WHERE username='{}' AND password='{}'"
        query = query.format(username,password)
        result = c.execute(query)
        for r in result:
            if r:
                conn.close()
                flag = _FLAG_ if username == 'admin' else None
                return BODY_HTML.format("""
                    <h3>EHLO {user}!</h3>
                        <!-- DEBUG: {flag} -->
                </div>""".format(user=username,flag=flag))

        conn.close()
    return BODY_HTML.format("<h1>Failed</h1>")


@app.route("/register",methods=['GET'])
def register():
  username = filter(request.args.get('username'))[:10]
  email = filter(request.args.get('email'))
  qa = filter(request.args.get('qa'))

  conn = init_db()
  c = conn.cursor()

  query = "SELECT 1 FROM users WHERE username='{}'"
  query = query.format(username)
  result = c.execute(query)

  if result.fetchone():
    conn.close()
    return BODY_HTML.format("{} already exists!".format(username))

  query = "INSERT INTO users VALUES"
  one_time_passcode1 = gen_passcode(username+'|'+email)
  query += "('{u1}','{qa1}','{p1}','{e1}')," #default one
  query = query.format(u1=username,qa1='default',p1=one_time_passcode1,e1=email)
  one_time_passcode2 = gen_passcode(username+'|'+email+'|forgot')
  query += "('{u2}','{qa2}','{p2}','{e2}')"  #forgot one
  query = query.format(u2=username,qa2=qa,p2=one_time_passcode2,e2=email)
  c.execute(query)

  r = conn.total_changes
  conn.commit()
  conn.close()
  return BODY_HTML.format("<h1>YAY!</h1><br /><p>Please login with following password: <pre>{}</pre></p>".format(one_time_passcode1)) if r else BODY_HTML.format("<h1>Failed</h1>")

@app.route("/change",methods=['GET'])
def change():
  username = filter(request.args.get('username'))[:10]
  password = filter(request.args.get('password'))
  new_password = gen_passcode(username+'|change')

  conn = init_db()
  c = conn.cursor()

  query = "UPDATE users SET password='{newp}' WHERE password='{p}' AND username='{u}' AND qa='default'"
  query = query.format(u=username,p=password,newp=new_password)
  c.execute(query)

  r = conn.total_changes
  conn.commit()
  conn.close()
  return BODY_HTML.format("<h1>YAY!</h1><br /><p>Your new password: <pre>{}</pre></p>".format(new_password)) if r else BODY_HTML.format("Not exists!")

@app.route("/forgot",methods=['GET'])
def forgot():
  username = filter(request.args.get('username'))[:10]
  email = filter(request.args.get('email'))
  qa = filter(request.args.get('qa'))

  conn = init_db()
  c = conn.cursor()

  query = "SELECT password FROM users WHERE username='{u}' AND email='{e}' AND qa='{qa}' AND qa<>'default'"
  query = query.format(u=username,e=email,qa=qa)
  result = c.execute(query)

  r = result.fetchone()
  conn.commit()
  conn.close()
  return BODY_HTML.format("<h1>Please keep it carefully!</h1><br /><p>Your second password: <pre>{}</pre></p>".format(r['password'])) if r else BODY_HTML.format("Not exists!")

if __name__ == "__main__":
    import logging
    logger = logging.getLogger('werkzeug')
    handler = logging.FileHandler(os.path.join(ROOT,'access.log'))
    logger.addHandler(handler)
    app.logger.addHandler(handler)
    app.run(host='0.0.0.0',port=5004,debug=False,processes=10)
