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
void choose(int *n[]){
    int i;
    char c;
    printf("Please choose winning numbers [1-9a-f] (type 0 if you're done)\n");

    for(i = 0; i < 256 ; i++)
        if ( (c = getchar()) == '0' )
            break;
        else
            n[c] = (int) n[c] + 1;
}


int main(){
    int i,numbers[256] ={0};
    unsigned int point = 0;
    char s[22] = "123456789ABCDEFabcdef";
    //
    alarm(30);
    srand(time(0));
    setvbuf(stdout, NULL, _IONBF, 0);
    puts(READFILE("/home/winner/intro.txt"));
    //
    choose(&numbers);
    printf("Thank you! Let's see the winning numbers...\n");
    sleep(3); puts(".");
    for(i = 0 ; i < 4 ; i++)
        point += numbers[ s[rand()%strlen(s)] ] * 1024;

    printf("You won: $%d\n",point);

    if(point < 0) puts(READFILE("/home/winner/flag"));
}