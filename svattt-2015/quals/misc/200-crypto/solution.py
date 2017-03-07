import socket
from struct import pack,unpack
from ctypes import c_int32
import telnetlib



LOCAL = ('119.15.167.216',31339)
BUFFER = 4096

"""
./hash_extender -s 2d4e953a0fc1b1299fce3d6735b71330 -a AFJPTEU9MQ== -f md5 -l 16 -d VVNFUk5BTUU9YWJjAEJpb2dyYXBoeT1kZWYAUk9MRT0w
Type: md5
Secret length: 16
New signature: 8fa2b0d115fbbb10d9bbce13359e3910
New string: 56564e46556b35425455553959574a6a41454a70623264795958426f6554316b5a575941556b394d52543077800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00100000000000041464a50544555394d513d3d
"""

s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.connect(LOCAL)

def recv_until(str,debug=0):
	recv_ = ''
	while not str in recv_:
		tmp = s.recv(BUFFER)
		recv_ += tmp
		if debug:
			print tmp
		continue
	return recv_

	
recv_until('>>>')
s.send('2\n')
s.recv(BUFFER)

cre = '56564e46556b35425455553959574a6a41454a70623264795958426f6554316b5a575941556b394d52543077800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00100000000000041464a50544555394d513d3d'.decode('hex') + '8fa2b0d115fbbb10d9bbce13359e3910'
s.send(cre+'\n')



t = telnetlib.Telnet()
t.sock = s
t.interact()

s.close()
