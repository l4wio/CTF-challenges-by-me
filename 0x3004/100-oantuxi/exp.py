import socket

HOST = 'challenges.wargame.vn'
PORT = 5555
BUFFER = 2048

s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.connect((HOST,PORT))

s.recv(BUFFER)
s.recv(BUFFER*10)
for i in range(100):
	print s.recv(BUFFER*4)
	s.sendall("Y\n")
	print s.recv(BUFFER*4)
	print s.recv(BUFFER)
	s.sendall("3\n")
	print s.recv(BUFFER)

