#!/usr/bin/env python
# -*- coding: utf-8 -*-

import socket, threading
import random
###########
class OanTuXi(threading.Thread):

	def __init__(self, ip, port, socket):
		threading.Thread.__init__(self)
		self.ip = ip
		self.port = port
		self.socket = socket
		self.DOREMON_CHOICES = ['1']
		print "[+] New thread started for "+ip+":"+str(port)

	def send_client(self,message):
		self.socket.send(message.encode('utf-8'))

	def get_flag(self):
		return open('./flag','r').read()

	def ketqua(self,dore,you):
		pair = (dore,you)
		for i in range(len(pair)):
			if i == 0:
				n = 1
			else:
				n = 0

			if pair[i] == pair[n]:
				return 'DRAW'
			if pair[i] == '1':
				if pair[n] == '2':
					return 'WIN'
				elif pair[n] == '3':
					return 'LOSE'

	def run(self):
		client = self.socket
		print "Connection from : "+ip+":"+str(port)
		self.send_client(u"CHƠI OẲN TÙ TÌ VỚI TỚ NHÉ !!! ^^\n")
		cdef short point = 30000
		
		self.send_client("%s\n" % open('./doremon','r').read())

		while True:
			self.send_client(u"Số điểm DOREMON đang có: %s\n" % point)
			self.send_client(u"Sẵn sàng chưa ?! Y/N\n")
			data = client.recv(5).strip()
			if data.lower() != 'y': 
				try:
					self.socket.close()
				except: pass
			self.send_client(u"Zô! Oẳn tù xì...\n")
			self.send_client(u"ra cái gì...?\n1. búa\n2. bao\n3. kéo\n\n")

			choice = "dummy"
			while len(data):
				choice = client.recv(5).strip()
				if choice in ['1','2','3']:
					break

			self.send_client(u"ra cái này...")

			DOREMON_CHOICE = self.DOREMON_CHOICES[random.randrange(len(self.DOREMON_CHOICES))]

			self.send_client("%s\n" % (open('doremon_%s' % DOREMON_CHOICE,'r').read()))

			result = self.ketqua(DOREMON_CHOICE,choice)

			if result == 'DRAW':
				point_change = '+0 (phew)'
			elif result == 'LOSE':
				point_change = '+50 :\'('
				point = point + 50
			else:
				point_change = '-50 \:D/'
				point = point - 50

			self.send_client(u"Kết quả: %s %s \nTiếp cưng!\n" % (result,point_change))

			if point <= 1337:
				self.send_client(u"Huhu, cờ của bạn đây: %s\n" % self.get_flag())
				break

			if point <= 29000:
				self.send_client(u"\nKhông chơi nữa :'(\n")
				break
		print "Client disconnected..."
host = "0.0.0.0"
port = 5555

tcpsock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
tcpsock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

tcpsock.bind((host,port))
threads = []


while True:
	tcpsock.listen(4)
	print "\nListening for incoming connections..."
	(clientsock, (ip, port)) = tcpsock.accept()
	newthread = OanTuXi(ip, port, clientsock)
	newthread.start()
	threads.append(newthread)

for t in threads:
	t.join()