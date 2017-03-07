
#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>

size_t recv_string(char* buffer,unsigned int size){
    unsigned int i = 0;
    unsigned char tmp=0;
    for(i=0;i<(size-1);i++){
        read(0,&tmp,1);
        if(tmp == 10 || tmp == -1) break;
        buffer[i] = tmp;
    }
    buffer[i] = '\0';
    return i;
}

char* name;
char* note;

char* READFILE(char* filename){
    FILE *f = fopen(filename,"rb");
    if(f == NULL) perror("failed");
    fseek(f, 0, SEEK_END);
    long fsize = ftell(f);
    if(fsize == 0) perror("failed");
    fseek(f, 0, SEEK_SET);
    char *RESULT = malloc(fsize + 1);
    fread(RESULT, fsize, 1, f);
    fclose(f);
    return RESULT;
}
void egg(){
    puts(READFILE("/home/camp4/flag"));
}


int main(){
    char buffer[128];
    char* p;
    char *note;
    int n;
    int len = strlen("%02d/%02d/%04d");
    int day,month,year;
    setvbuf(stdout, NULL, _IONBF, 0);
    alarm(30);
    puts("Please fill out this form;");
    puts("Name|DoB|Note (for example: 'bob|01/01/1990|hi,howdy');");
    while(1){
        printf("> ");
        n = recv_string(buffer,128);
        p = buffer;
        if(strncmp(p,".exit",5) == 0) break;
        p = strchr(p,'|');
        *p++ = 0;
        name = strdup(buffer);
        if (sscanf(p,"%02d/%02d/%04d|",&day,&month,&year) != 3) {
            puts("Failed at parsing your birthday.");
            exit(-1);
        }
        p += 11;
        note = strdup(p);

        puts("Here is your profile, please check it carefully before you leave.");
        printf("Name: %s\nDoB: %d/%d/%d\nNote: %s\n",name,day,month,year,note);
    }
    printf("anything else?\n");
    recv_string(buffer,256);
    puts("Okay, see ya dawg!");
}