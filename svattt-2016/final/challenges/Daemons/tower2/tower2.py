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
    s = sub(r'[\(|\)|\/|\*]','',s)
    return addslashes(s)

app = Flask(__name__)
ROOT = os.path.dirname(os.path.realpath(__file__))
_FLAG_ = open(os.path.join(ROOT,'flag'),'rb').read()

BODY_HTML = """
<link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/sandstone/bootstrap.min.css" rel="stylesheet" integrity="sha384-G3G7OsJCbOk1USkOY4RfeX1z27YaWrZ1YuaQ5tbuawed9IoreRDpWpTkZLXQfPm3" crossorigin="anonymous">
<title>Tower-X-Tower-level01</title>
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
    """)


@app.route("/",)
def index():
    if request.args.get('source') == '1':
      from cgi import escape
      return BODY_HTML.format('<pre>{}</pre>'.format(escape(open(os.path.join(ROOT,__file__),'rb').read()).encode('ascii', 'xmlcharrefreplace'))
)
    return INDEX_HTML

@app.route("/login",methods=['GET'])
def login():
    username = filter(request.args.get('username'))
    password = filter(request.args.get('password'))

    if username != '' and password != '':
        conn = sqlite3.connect(os.path.join(ROOT,'users.db'))
        conn.row_factory = sqlite3.Row
        c = conn.cursor()

        query = "SELECT username,username='{}' AND password='{}' FROM users"
        query = query.format(username,password)
        result = c.execute(query)

        for r in result:
            flag = _FLAG_ if 'flag' in r.keys() else ''
            if r[1] == 1:
                conn.close()
                return BODY_HTML.format("""
                    <h3>EHLO {user}!</h3>
                        <!-- DEBUG: {flag} -->
                </div>""".format(user=username,flag=flag))
    conn.close()
    return BODY_HTML.format("<h1>Failed</h1>")

if __name__ == "__main__":
    import logging
    logger = logging.getLogger('werkzeug')
    handler = logging.FileHandler(os.path.join(ROOT,'access.log'))
    logger.addHandler(handler)
    app.logger.addHandler(handler)
    app.run(host='0.0.0.0',port=5002,debug=False,processes=10)