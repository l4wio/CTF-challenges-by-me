#include <stdio.h>
#include <stdlib.h>
#include <string.h>

__attribute__((constructor)) static void _(){
	setvbuf(stdout, NULL, _IONBF, 0);
}

typedef struct record_struct{
	char name[128];
	char* value;
} RECORD;

RECORD* LIST[256];
int SUM = 0;

int recv_integer(){
	printf("> ");
	int tmp=0;
	scanf("%d",&tmp);
	return tmp;
}
void MAGIC(){
	system("cat /home/weirddatabase/flag");
}

void recv_string(char* buffer,unsigned int size){
	unsigned int i = 0;
	unsigned char tmp=0;
	for(i=0;i<(size-1);i++){
		read(0,&tmp,1);
		if(tmp == 10 || tmp == -1) break;
		buffer[i] = tmp;
	}
	buffer[i] = '\0';
}

void PUSH(char* name,char* value_heap){
	if(SUM >= 255) return;
	RECORD* this = 0;
	this = calloc(1,sizeof(RECORD));
	strcpy(this->name,name);
	this->value =  value_heap;
	strcpy(this->value,value_heap);
	LIST[SUM++] = this;
}
void GET(char* name){
	int i;
	RECORD* this = 0;
	for(i=0;i<SUM;i++){
		this = LIST[i];
		if(strncmp(this->name,name,strlen(name))==0){
			puts(LIST[i]->value);
			return;
		}
	}
}
int anti_sqlinjection(char* buffer){
	int i;
	if(strchr(buffer,'\'') != NULL) return 1;
	if(strchr(buffer,'"')!= NULL) return 1;
	return 0;
}
void EDIT(unsigned int id,char* value,size_t size){
		char BUFFER[strlen(value)];
		RECORD* this = 0;
		if(anti_sqlinjection(value)){
			puts("Hacker detected!");
			puts("Please enter your value again:");
			read(0,BUFFER,size);
		} else{
			strcpy(BUFFER,value);
		}
		
		if(id > SUM){
			return;
		}
		if(this){
			memcpy(this->value,BUFFER,strlen(BUFFER));
		}
}