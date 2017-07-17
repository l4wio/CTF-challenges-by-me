#include<stdio.h>
#include<pthread.h>
#include<stdlib.h>

char FLAG[128];
unsigned int size;


int recv_integer(){
    char tmp[8] = {0};
    read(0,tmp,8);
    return atoi(tmp);
}

void* recv()
{
    // printf("Size: %d\n",size);
    char* ret = malloc(size);
    pthread_exit(ret);
}

void* crackme(char* input){

    int s;
    int remain = size;
    char* offset = input;
    char tmp[1024] = {0};

    while(remain)
    {
        read(0,offset,4);
        memcpy(&s,offset,4);
        offset += 4;
        remain -= 4;
        if(remain < 4) break;
        if(s > remain)  break;
        read(0,input+s,4);
        remain -= 4;
        // printf("remain: %d\n",remain);
    }

    int32_t sum = 0;
    int x;

    for(int i = 0; i < size; i+=4){
        memcpy(&x,&input[i],4);
        sum += x;
    }


    unsigned int d = recv_integer();
    char* name = malloc(d);
    read(0,name,d);

    if(sum == 0xc0c0aff6)
        printf("Good boy! Your license: %s\n",name);
    else
        printf("Bad b0y!\n");



    exit(0);
}

int main()
{
    pthread_t thread_id;
    pthread_t thread_id2;

    setvbuf(stderr, NULL, _IONBF, 0);
    setvbuf(stdin, NULL, _IONBF, 0);
    setvbuf(stdout, NULL, _IONBF, 0);

    alarm(20);

    int fd = open("/home/anotherarena/flag",0);
    read(fd,FLAG+1,128);
    close(fd);

    char *b;

    size = recv_integer();

    if(size <= 4096){
        pthread_create (&thread_id, NULL,&recv, NULL);
        pthread_join(thread_id,(void**)&b);
        pthread_create (&thread_id2, NULL,&crackme, b);
        pthread_join(thread_id2,NULL);

    }

}