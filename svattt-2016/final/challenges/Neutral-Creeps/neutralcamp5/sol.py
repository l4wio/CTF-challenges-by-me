import traceback
def decode_chunked(data):
    offset = 0
    encdata = ''
    newdata = ''
    offset = 0
    # of the data payload. you can also parse content-length header as well.
    encdata =data[offset:]
    try:
        while (encdata != ''):
            off = int(encdata[:encdata.find("\r\n")],16)
            if off == 0:
                break
            encdata = encdata[encdata.find("\r\n") + 2:]
            newdata = "%s%s" % (newdata, encdata[:off])
            encdata = encdata[off+2:]
                             
    except:
       line = traceback.format_exc()
       print "Exception! %s" %line # probably indexes are wrong
    return newdata
a = open('chal','rb').read()
print decode_chunked(a).encode('hex')
"""a = open('flag.zip','rb').read()
from random import randint
i = 0
f = open('chal','wb')
remain = len(a)
done = 0
while done < len(a):
	chunk = remain if remain < 10 else randint(1,10)
	f.write("%X\r\n%s\r\n" % (chunk, a[done:done+chunk]))
	done += chunk
	remain -= chunk
f.close()

"""