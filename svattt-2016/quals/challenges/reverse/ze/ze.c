#include <stdio.h>
#include <stdlib.h>


int main(int argc,char* argv[]){
    if(argc < 2) exit(-1);
    int len = strlen(argv[1]);
    unsigned int n;
    char* p = argv[1];
    if(p[len-1] == '\n') p[len-1] = '\0';
    if(strlen(p)!=8) exit(-1);
    n = strtoul(p,NULL,17);
    if( n == 53){
        printf("SVATTT{%s}\n",p);
    }
}