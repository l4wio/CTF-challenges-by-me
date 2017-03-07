#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>


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
void choose(char* buf,int* n[]){

    char tmp[12];
    char* div;
    unsigned int i;
    unsigned int count=0;
    do{
        if( count++ > 5) break;
        printf("> ");
        read(0,buf,sizeof(tmp));
        div = strtok(buf,"[");
        if(div != NULL){
            div = strtok(div,"-");
            if(div != NULL){
                unsigned short from = atoi(div);
                if(from == 0) break;
                div = strtok(NULL,"]");
                if(div != NULL){
                    unsigned short to = atoi(div);
                    if(to == 0) break;
                    div = strtok(NULL,"\n");
                    if(div != NULL){
                    for(i=from;i<=to;i++){
                        memset(tmp,0,sizeof(tmp));
                        sprintf(tmp, "%u%s",i,div);
                        printf("Placed %s\n",tmp);
                        unsigned char c = atoi(tmp) & 0xff;
                        n[c] = (int) n[c] + 1;

                    }
                }
            } else {
                unsigned char c = atoi(buf) & 0xff;
                n[c] = (int) n[c] + 1;
                printf("Placed %d\n",c);
                continue;
            }
        }
        }
    }while( ! ( buf[0] == '0' && buf[1] == '\n' ) );
}


int main(){
    char buf[256] = {0};
    int i,numbers[1024] ={0};
    unsigned int point = 0;
    //
    alarm(30);
    srand(time(0));
    setvbuf(stdout, NULL, _IONBF, 0);
    puts(READFILE("/home/tower3/intro.txt"));
    //
    printf("Please choose winning numbers (type 0 if you're done)\n");
    printf("New feature has been added!\nNow you can choose multiple numbers with fixed ending by typing '[10-22]33' (for example)\n");

    choose(buf,&numbers);

    printf("Thank you! Let's see the winning numbers...\n");
    sleep(3); puts(".");
    for(i = 0 ; i < 5 ; i++)
        point += numbers[ ( rand() % 1024) ]*1;

    printf("You won: $%u\n",point);

    if(point > 0x13370){
        printf("Here is your reward: ");
        puts(READFILE("/home/tower3/flag"));
    }
}