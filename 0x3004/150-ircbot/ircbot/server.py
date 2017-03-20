import socket
import sys
import re
import subprocess
import threading
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
	mess = 'PRIVMSG {0} :{1}'.format(to,msg)
	print '[DEBUG] MESS:',mess
	s.sendall(mess+"\n")

IRCBOT_NAME = 'sweet_potatoes'
PASSWORD = 'abc123bot123'
CHANNEL = '#vnsec'

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
		print '[DEBUG]',data
		print '-------------------------'
		if 'PING' in data: # reply ping
			pong = 'PONG :{0}\n'.format(data.split('PING :')[1].strip())
			s.sendall(pong)
			print pong
		if 'PRIVMSG' in data:
			try:
				info = re.findall(r':([\w_]+)!([^@]+)@([^\ ]+) PRIVMSG '+IRCBOT_NAME+' :(.+)',data)[0]
				if info:
					username = info[0][:25]
					realname = info[1][:25]
					hostname = info[2][:25]
					message = info[3].strip()
					notice = 'Message from: %s / %s / %s' % (username,realname,hostname)
					send_message(username,notice)
					notice += '\n'+'@%s: %s' % (IRCBOT_NAME,message)
					send_message(username,'ping -c 1 -w1 "{0}"'.format(hostname))
					try:
						pid = os.fork()
						if pid == 0:
							ping_result = subprocess.Popen('ping -c 1 -w1 "{0}"'.format(hostname),shell=True,stdout=subprocess.PIPE).communicate()[0].split("\n")[0]
							from time import sleep
							sleep(2)
							send_message(username,ping_result)
							sys.exit()
					except:
						pass
			except:
				pass

	except KeyboardInterrupt:
		import sys
		sys.exit()



s.close()
