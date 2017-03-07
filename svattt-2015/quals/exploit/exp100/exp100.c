/* gcc -m32 -fno-stack-protector -o exp100 exp100.c */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main(){
	int n;
	short ADMIN = 0;
	char password[128];
	char buffer[128];
	
	alarm(30);
	setvbuf(stdout, NULL, _IONBF, 0);
	
	memset(password,'\0',128);
	memset(buffer,'\0',128);

	
	chdir("/home/exp100/");
	//Read entire password.txt
	FILE * pFile;
	pFile = fopen("password.txt","rb");
	fread(password,1,32,pFile);
	fclose(pFile);
	
	printf("Enter password:");
	
	n = read(0,buffer,128) - 1;
	if(n > 1)
		if(!strncmp(password,buffer,strlen(buffer)))
		{
			printf("Welcome to SVATTT 2015!\nWhat manual page do you want?\nhelp> ");
			memset(buffer,'\0',128);
			read(0,buffer,128);
	
			if(strchr(buffer,'-')!=0) return 0;
			if(strchr(buffer,';')!=0) return 0;
			if(strchr(buffer,'|')!=0) return 0;
			if(strchr(buffer,'&')!=0) return 0;
			if(strchr(buffer,' ')!=0) return 0;
			if(strchr(buffer,'\t')!=0) return 0;
			if(strchr(buffer,'\n')!=0) return 0;
			if(strchr(buffer,'\r')!=0) return 0;
			if(strchr(buffer,'\'')!=0) return 0;
			if(strchr(buffer,'"')!=0) return 0;
			
			char* cmd = calloc(sizeof(char),strlen(buffer)+5);
			strcat(cmd,"man ");
			strcat(cmd,buffer);
			
			system(cmd);
			
			
			if(ADMIN)
			{
				puts("Here is your flag:");
				system("cat flag.txt");
			}
		}
	
}