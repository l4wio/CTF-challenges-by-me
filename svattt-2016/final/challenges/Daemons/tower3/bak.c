#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>

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

int main(){
    char survey[512] = {0};
    char buf[128] = {0};
    setvbuf(stdout, NULL, _IONBF, 0);
    alamr(30);
    system("date");
    puts("Hi man, would you like to take a survey about SVATTT this year?");
    int n;
    recv_string(buf,128);
    if(strncmp(buf,"yes",3) == 0){
        printf("Your name: ");
        recv_string(buf,128);
        snprintf(survey+strlen(survey),sizeof(survey),"%s|",buf);
        printf("Your age: ");
        recv_string(buf,128);
        snprintf(survey+strlen(survey),sizeof(survey),"%s|",buf);
        printf("What kind of category would you prefer to play (eg.: pwn/rev/crypto/web/...) : ");
        recv_string(buf,128);
        snprintf(survey+strlen(survey),sizeof(survey),"%s|",buf);
        printf("What was the best challenge: ");
        recv_string(buf,128);
        snprintf(survey+strlen(survey),sizeof(survey),"%s|",buf);
        printf("Anything else, man ?\n");
        recv_string(buf,128);
        snprintf(survey+strlen(survey),sizeof(survey),"%s|",buf);

        printf("Please check it again\n%s",survey);

        printf("\n\n--\nThank you so much, man! Have a good one.\n");
        sleep(1);
        puts("Oh wait, you may wanna check this,man /home/tower3/flag");

    } else {
        puts("No problem man, thank you for your attention.");
    }

}