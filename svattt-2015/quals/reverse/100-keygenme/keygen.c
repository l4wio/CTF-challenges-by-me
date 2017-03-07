/*
clang -m32 keygen.c -o keygen;
strip keygen;
*/



#include <stdlib.h>
#include <stdio.h>


char* READFILE(char* filename){
	FILE *f = fopen(filename,"rb");
	fseek(f, 0, SEEK_END);
	long fsize = ftell(f);
	fseek(f, 0, SEEK_SET);
	char *RESULT = malloc(fsize + 1);
	fread(RESULT, fsize, 1, f);
	fclose(f);
	return RESULT;
}

int main(){
	
	char buffer[256];
	char c;
	short FLAG = 0;
	int DEBUG = 0;
	
	
	alarm(30);
	setvbuf(stdout, NULL, _IONBF, 0);
	memset(buffer,'\0',256);
	
	printf("Enter key: ");
	read(0,buffer,256);
	buffer[strlen(buffer)-1] = '\0';
	
	for(int i = 0; i < strlen(buffer); i++){
		
		c = buffer[i];
		
		if(!((c>=48&c<=57) || (c>=65&c<=90) || (c>=97&c<=122))){
			printf("Only [0-9 a-z A-Z] are allowed!\n");
			break;
		}
		if(c&1)
			FLAG += 1;
		if(c&2)
			FLAG += 3;
		if(c&4)
			FLAG += 128;
		if(c&8)
			FLAG += 64;
		if(c&16)
			FLAG -= 3;
		if(c&32)
			FLAG -= 1;
		if(c&64)
			FLAG *= 64;
		if(c&128)
			FLAG *= 0x1337;
		
		if(DEBUG)
			printf("[DEBUG] FLAG: %hu %d\n",FLAG,0x1337);
	}
	if(FLAG == 0x1337){
		printf("Here is your flag: %s\n",READFILE("/home/rev100/flag.txt"));
	} else {
		printf("Nope :/\n");
	}
	
	
	
	
}