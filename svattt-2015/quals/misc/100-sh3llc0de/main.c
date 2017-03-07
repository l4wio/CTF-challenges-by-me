#include <stdlib.h>
#include <stdio.h>
#include <string.h>

/*
gcc -m32 -zexecstack sh3llc0de.c -o sh3llc0de
*/

char shellcode[1024];

int main(){
	int i;
	system("date");
	read(0,shellcode,1024);
	for(i = 0 ; i < 1024; i++){
		if(shellcode[i] == '\xcd') shellcode[i] = '\0';
		if(shellcode[i] == '\x80') shellcode[i] = '\0';
		if(shellcode[i] == '\x83') shellcode[i] = '\0';
	}
	close(0);close(1);close(2);
	(*(void(*)()) shellcode)();
}