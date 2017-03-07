#include <stdio.h>
#include <unistd.h>
#include <fcntl.h>

char shellcode[16];
char buffer[128];

void main() {
    void (*ret)(void) = &shellcode;
    setvbuf(stdout, NULL, _IONBF, 0);
    alarm(30);
    open("/home/shellcode1/flag",O_RDONLY);
    puts("Give me your shellcode:");
    read(0,shellcode,sizeof(shellcode));
    (*ret)();
    write(1,buffer,128);
}