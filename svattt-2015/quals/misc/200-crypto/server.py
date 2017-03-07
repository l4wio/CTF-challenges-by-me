#!/usr/bin/python
from base64 import b64decode,b64encode
from hashlib import md5

SECRET = '\x04\xdfPpz\x88\x88\x8e\x8d\xf3R0\x88\x9c\xc7\x1d'


import sys
class Unbuffered(object):
   def __init__(self, stream):
       self.stream = stream
   def write(self, data):
       self.stream.write(data)
       self.stream.flush()
   def __getattr__(self, attr):
       return getattr(self.stream, attr)


sys.stdout = Unbuffered(sys.stdout)
sys.stderr = None


class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

_MENU = """--------------------------
1. Register
2. Login
3. Info
4. Logout"""

USERNAME = None
Biography  = None
ROLE = None

def is_ascii(s):
    return all((ord(c) < 128) and (ord(c) != 0) for c in s)

def register():
	global USERNAME,Biography,ROLE
	USERNAME = raw_input('Username: ')
	Biography = raw_input('Biography: ')
	ROLE = '0'
	
	if not is_ascii(USERNAME) or not is_ascii(Biography):
		print bcolors.WARNING + 'Non-ASCII characters in USERNAME|Biography are not allowed!' + bcolors.ENDC
		USERNAME = None
		Biography = None
		ROLE = None
	
	if USERNAME and Biography:
		print bcolors.OKGREEN + 'You have successfully registered!' + bcolors.ENDC

def info():
	global USERNAME,Biography,ROLE
	print bcolors.OKBLUE+"[+] Username: {}\n[+] Biography: {}\n[+] Role: {}".format(USERNAME,Biography,ROLE)
	print 'Hm...no flag for you!'
	if ROLE == '1':
		print 'Welcome admin, HOWDY!'
		print 'Your secret: SVATTT_base64_is_awesome_\\x80'
	print bcolors.ENDC

def parse(info):
	global USERNAME,Biography,ROLE
	block = info.split('\x00')
	print '[DEBUG]',block
	for b in block:
		if b.startswith('USERNAME='):
			USERNAME = b[9:]
		if b.startswith('Biography='):
			Biography = b[10:]
		if b.startswith('ROLE='):
			ROLE = b[5:]
	

def login():
	global USERNAME,Biography,ROLE
	cre = raw_input('Enter your credential: ')
	info = cre[:-32]
	sign = cre[-32:]
	if md5(SECRET+info).hexdigest() == sign:
		info = b64decode(info)
		parse(info)
		print bcolors.OKGREEN+'You have logged in successfully!\nWelcome back, {}'.format(USERNAME) + bcolors.ENDC
	else:
		USERNAME = None
		Biography = None
		ROLE = None
		
		print bcolors.FAIL + 'Your credential is invalid!' + bcolors.ENDC
	
	

def gen_credential():
	global USERNAME,Biography,ROLE
	b64 = "USERNAME={}\x00Biography={}\x00ROLE={}".format(USERNAME,Biography,ROLE)
	b64 = b64encode(b64)
	return b64+md5(SECRET + b64).hexdigest()

print bcolors.FAIL + "Welcome to Hacker's/GuestBook\nFor Hackers - By ...Hasher :)" + bcolors.ENDC
while True:
	print _MENU
	choice = raw_input(">>> ")
	if choice == '1':
		register()
	elif choice == '2':
		login()
	elif choice == '3':
		info()
	else:
		break

if USERNAME != None:
	print 'Here is your credential, login with it next time!'
	print bcolors.OKGREEN+gen_credential()+bcolors.ENDC
	print '~'

print 'Bye!'	