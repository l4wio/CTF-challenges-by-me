/*
gcc -m32 main.c -o main
*/

#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

int main(){
	int choice,fd;
	char buffer[512];
	chdir("/home/100-canyoureadflag/");
	memset(buffer,'\0',512);
	
	strcpy(buffer,"/tmp/canyoureadflag/");

	read(0,strlen(buffer)-1,256);
	
	if(buffer[strlen(buffer)-1] == '\n')
		buffer[strlen(buffer)-1] = '\0';
	
	puts(buffer);
	if(strchr(buffer,'.'))  return 0;
	
	mkdir(buffer, S_IRWXU | S_IRWXG | S_IRWXO);

	chdir(buffer);
	
	system("echo nice >flag;cat flag");
	
}
