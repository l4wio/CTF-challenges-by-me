#include <pthread.h>
#include <stdio.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <stdint.h>

#define BLACK_COFFEE 1
#define MILK_COFFEE 2
#define COCONUT 3

#define ANSI_COLOR_RED     "\x1b[31m"
#define ANSI_COLOR_GREEN   "\x1b[32m"
#define ANSI_COLOR_YELLOW  "\x1b[33m"
#define ANSI_COLOR_BLUE    "\x1b[34m"
#define ANSI_COLOR_MAGENTA "\x1b[35m"
#define ANSI_COLOR_CYAN    "\x1b[36m"
#define ANSI_COLOR_GRAY    "\x1b[90m"
#define ANSI_COLOR_RESET   "\x1b[0m"

uint8_t quantity;

int recv_integer(){
    printf("> ");
    int tmp=0;
    scanf("%d",&tmp);
    return tmp;
}

int menu(){
    puts("-------- 🇻🇳  Vietnamese Coffee ☕  --------");
    puts("1. Order");
    puts("2. Pay");
    puts("3. Go");
    puts("4. Take");
    return recv_integer();
}

void order();
void pay();
void take();
int main(){

    setvbuf(stdin, NULL, _IONBF, 0);
    setvbuf(stdout, NULL, _IONBF, 0);
    alarm(60);

    while(1){
        int cmd = menu();
        switch(cmd){
            case 1:
                order();
                break;
            case 2:
                pay();
                break;
            case 3:
                exit(0);
                break;
            case 4:
                take();
                break;
            default:
                break;
        }
    }
}

struct drink {
    uint8_t done;
    uint8_t type;
    uint8_t iced;
    uint8_t size;
    uint8_t milk;
    uint8_t sugar;
};

struct cup {
    uint8_t id;
    char desc[32];
};

struct queue {
    struct cup* c;
    struct queue* next;
};

struct drink **DRINKS;
struct queue *HEAD;


void drink_menu(){
    puts("------------ MENU ------------");
    puts("1. Black coffee");
    puts("2. Milk Coffee");
    puts("3. Coconut");
    puts("------------ MENU ------------");
    puts("              **              ");
    puts("              **              ");
}

void order(){
    int i;
    int type,sugar,milk;
    char tmp[256];

    printf("You would like to order, sir? ");
    read(0,tmp,256);
    if(tmp[0] == 'n' || tmp[0] == 'N')
        return;

    if(DRINKS) return;

    while(1){
        printf("How many cups, sir? ");
        quantity = recv_integer();
        if(quantity > 0 && quantity < 50) break;
    }

    DRINKS = calloc(sizeof(struct drink*),quantity);
    for(i = 0; i < quantity; i++){
        DRINKS[i] = calloc(1,sizeof(struct drink));
        DRINKS[i]->done = 1;
    }
    printf("Are you ready, sir? (Y/N) ");
    read(0,tmp,256);

    while(1){
        if(tmp[0] != 'n' && tmp[0] != 'N')
            break;
    }

    drink_menu();

    for(i = 0; i < quantity; i++){
        struct drink* this = DRINKS[i];
        if(!this) continue;
        printf("👧  Which one, sir? (1,2,3) ");
        this->type = recv_integer();

        printf("Sugar (0-30\%) ");
        this->sugar = recv_integer();

        printf("Milk (10-20\% will be best) ");
        this->milk = recv_integer();

        printf("Iced (0-50%%) ");
        this->iced = recv_integer();

        printf("Size (1-3) ");
        this->size = recv_integer();

    }

    puts("👧  Got it, sir. Please wait a few minutes.");


}

void coffee_ascii(){

    puts("  ........");
    puts("  |      |]");
    puts("  \\      /");
    puts("   `----'");
}

void* threadfunc(int i){
    pthread_detach(pthread_self());

    if(!DRINKS) goto exit_;

    struct drink* this = DRINKS[i-1];

    if(!this || !this->done) goto exit_;

    int sugar = this->sugar;
    int milk = this->milk;
    int iced = this->iced;
    int size = this->size;
    int type = this->type;

    printf("#%d We're making it up...take a while\n",i);

    switch(this->type){
        case BLACK_COFFEE:
            coffee_ascii();
            printf("Black Coffee ☕  is being prepared...");
            break;
        case MILK_COFFEE:
            coffee_ascii();
            printf("Milk Coffee ☕  is being prepared...");
            break;
        case COCONUT:
            printf("Coconut 🌴  is being prepared...");
            break;
        default:
            break;
    }
    if(sugar && type == BLACK_COFFEE){
        sleep(1);
        printf("%d%% sugar...\n",sugar);
    }
    if(milk && type == MILK_COFFEE){
        sleep(1);
        printf("%d%% milk...\n",milk);
    }
    if(iced){
        sleep(1);
        printf("%d%% iced...\n",iced);
    }
    if(size){
        printf("size %d...\n",size);
    }
    printf(ANSI_COLOR_GREEN "\nOrder #%d -> Ready!\n" ANSI_COLOR_RESET,i );
    this->done = 0;
    if(i == 1){
        if(!HEAD)
            HEAD = calloc(1,sizeof(struct queue));
        struct queue* t = HEAD;
        for( ; t && t->c;t=t->next)
            ;;

        for(int n = 0; n < quantity; n++){
            if(!DRINKS) break;
            struct drink* this = DRINKS[n];
            if(!this) continue;

            t->c = calloc(1,sizeof(struct cup));
            t->c->id = n;

            switch(this->type){
                case BLACK_COFFEE:
                    sprintf(t->c->desc,"%s %d%% sugar","Black Coffee",this->sugar);
                    break;
                case MILK_COFFEE:
                    sprintf(t->c->desc,"%s %d%% milk","Milk Coffee",this->milk);
                    break;
                case COCONUT:
                    sprintf(t->c->desc,"%s","Coconut");
                    break;
                default:
                    break;
            }

            free(DRINKS[n]);
            DRINKS[n] = 0;
            t->next = calloc(1,sizeof(struct queue));
            t = t->next;
        }
        DRINKS = 0;
    }
exit_:
    pthread_exit(0);
}

void pay(){
    int i = quantity;
    pthread_mutex_t lock;

    while(i){
        pthread_t* t = malloc(sizeof(pthread_t));
        pthread_create(t,NULL,threadfunc,i);
        i--;
        usleep(200);
    }

}

void take(){
    struct queue* t = HEAD;
    puts("👧  Here you are...\n");
    puts(ANSI_COLOR_YELLOW "----------------- RECEIPT -----------------");
    puts("|                    *                    |");
    puts("|                                         |");

    for(; t && t->c ; t = t->next){
        if(!t->c->desc) continue;
        printf("| %03d. %32s   |\n", t->c->id, t->c->desc);
    }

    puts("|                                         |");
    puts("------------------ ~~*~~ ------------------\n\n" ANSI_COLOR_RESET);



}