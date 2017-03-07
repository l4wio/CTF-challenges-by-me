#include <stdio.h>
#include <stdlib.h>
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

void print_menu(){
    puts("+------------- MENU -------------+");
    puts("| 0x1             Black Coffee   |");
    puts("| 0x2             Milk Coffee    |");
    puts("| 0x3             Matcha         |");
    puts("| 0x4             Cake           |");
    puts("| 0x5             Water          |");
    puts("| 0x1337          Jelly Freeze   |");
    puts("+--------------------------------+");
}

struct order{
    char name[128];
    unsigned int type;
};

int main(){
    srand(time(0));
    alarm(30);
    unsigned int max = (rand() % 6) + 5;
    struct order ORDERS[10];
    struct order* this_order = &ORDERS;
    unsigned int i = 0;
    unsigned int len = 0;
    unsigned int count = 0;
    char choice[8];


    //
    setvbuf(stdout, NULL, _IONBF, 0);
    puts(READFILE("/home/c0ffee/intro.txt"));
    //


    printf("Hi sir! Welcome to 0xC0FFEE SHOP v1.1\n");
    do {
    printf("How many cups, sir?\ncups> ");
    scanf("%08s%*c",choice);
    len = atoi(choice);

        if(len > max){
            printf("No way, sir. There is a long queue, please take %d cups at once. Thank you for your understanding.\n",max);
        } else {
            break;
        }
    } while(1);


    while(  count < max  ) {
        print_menu();
        printf("what is your name, sir? then I can write it on the cup.\nsize> ");
        scanf("%08s%*c",choice);
        len = atoi(choice);

        if(len == 0 || len > 128){
            puts("Sorry sir, what's wrong with your name?! are you trying to hack us? I'm calling police now.");
            exit(-1);
        }

        memset(this_order->name,0,128);
        i = 0;
        while( i < len ) {
            i += read(0,this_order->name+i,len-i);
        }
        this_order->name[i] = '\0';

        printf("Which one, sir?\n>> ");
        scanf("%08s%*c",choice);
        len = atoi(choice);
        this_order->type = len;

        count++;
        this_order++;

        printf("anything else, sir?\n> ");
        scanf("%08s%*c",choice);
        if(strcmp(choice,"yes") != 0)
            break;

    }

    puts("Thank you so much, sir!\n...bling bling $$$\n...ching ching $$$\n\nHere is your receipt: ");
    for(i = 0 ; i < count ; i++){
        printf("%16s | %03d\n",ORDERS[i].name,ORDERS[i].type);
    }

}