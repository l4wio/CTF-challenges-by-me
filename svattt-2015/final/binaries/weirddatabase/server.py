#!/usr/bin/python
from ctypes import *
from struct import pack,unpack
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
#sys.stderr = None


libc = CDLL("libc.so.6")
stuff = CDLL("/home/noname/Workspace/SVATTT/final/exploit/weirddatabase/stuff.so")

recv_string = stuff.recv_string
recv_integer = stuff.recv_integer

read = libc.read
write = libc.write
atoi = libc.atoi
puts = libc.puts
printf = libc.printf
strcpy = libc.strcpy
memcpy = libc.memcpy
memset = libc.memset
strncmp = libc.strncmp
strlen = libc.strlen
malloc = libc.malloc
free = libc.free
calloc = libc.calloc


def buffer(x):
	b = create_string_buffer(x)
	memset(b,0,x)
	return b


def write_out(input_):
	write(1,input_,strlen(input_))

write_out("\n\tWEIRD DATABASE\n")


while True:
	choice = raw_input("cmd> ")
	if choice.startswith('PUSH'):
		name = buffer(128)
		value = buffer(8192)
		
		recv_string(name,128)
		recv_string(value,8192)
		
		value_heap = malloc(strlen(value))
		memcpy(value_heap,value,strlen(value))
		
		
		stuff.PUSH(name,value_heap)
	elif choice.startswith('GET'):
		name = buffer(128)
		recv_string(name,128)
		stuff.GET(name)
	elif choice.startswith('EDIT'):
		id = recv_integer()
		value = buffer(8192)
		recv_string(value,8192)
		
		stuff.EDIT(id,value,len(value))

	elif choice.startswith("EXIT"):
		break