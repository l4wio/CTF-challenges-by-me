import socket
import sys

HOST = 'irc.freenode.net'
PORT = 8001
BUFFER = 4096

def recv_until(str,debug=0):
	recv_ = ''
	while not str in recv_:
		tmp = s.recv(BUFFER)
		recv_ += tmp
		if debug:
			print tmp
		continue
	return recv_

def send_message(to,msg):
	s.sendall('PRIVMSG {0} :{1}\n'.format(to,msg))



IRCBOT_NAME = "abc"
CHANNEL = '#vnsecx'

s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.connect((HOST,PORT))
print 'Connecting {0}:{1}'.format(HOST,PORT)
data = recv_until('No Ident response',1)
s.sendall('NICK {0}\n'.format(IRCBOT_NAME))
s.sendall('USER {0} 0 * :{0}\n'.format(IRCBOT_NAME))
data = recv_until('End of /MOTD command',1)
s.sendall('JOIN {0}\n'.format(CHANNEL))
data = recv_until('End of /NAMES list',1)
send_message('abchaha',"abc\rhihi\rhaha")



s.close()
