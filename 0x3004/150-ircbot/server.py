import socket
import sys
import re
import os

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



IRCBOT_NAME = 'sweet_potatoes'
PASSWORD = 'abc123bot123'
CHANNEL = '#vnsecx'

s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.connect((HOST,PORT))
print 'Connecting {0}:{1}'.format(HOST,PORT)
data = recv_until('No Ident response')
s.sendall('NICK {0}\n'.format(IRCBOT_NAME))
s.sendall('USER {0} 0 * :{0}\n'.format(IRCBOT_NAME))
data = recv_until('This nickname is registered')
send_message('NickServ','identify {0}\n'.format(PASSWORD))
data = recv_until('You are now identified for')
print 'Login: OK'
s.sendall('JOIN :{0}\n'.format(CHANNEL))
data = recv_until('End of /NAMES list')
print 'JOIN {0}'.format(CHANNEL)
send_message('{0}'.format(CHANNEL),'ehlo from ML\'s pet ;)')
print 'SAY EHLO to {0}'.format(CHANNEL)

while True:
	try:
		data = s.recv(BUFFER)
		print '-------------------------'
		if 'PING' in data: # reply ping
			pong = 'PONG :{0}\n'.format(data.split('PING :')[1].strip())
			s.sendall(pong)
			print pong
		if 'PRIVMSG' in data:
			print '[DEBUG]',data
			try:
				info = re.findall(r':([\w_]+)!([^@]+)@([^\ ]+) PRIVMSG '+IRCBOT_NAME+' :(.+)',data)[0]
				if info:
					username = info[0]
					realname = info[1]
					hostname = info[2]
					message = info[3].strip()
					notice = 'Message from: %s / %s / %s' % (username,realname,hostname)
					notice += '\n'+'@%s: %s' % (IRCBOT_NAME,message)
					print notice
					send_message(username,notice)
					send_message(username,'ping -c 1 -w1 "{0}"'.format(hostname))
					try:
						os.popen('ping -c 1 -w1 "{0}"'.format(hostname))
					except:
						pass
			except:
				pass

	except KeyboardInterrupt:
		import sys
		sys.exit()



s.close()
