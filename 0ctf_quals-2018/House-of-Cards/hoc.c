
#include <stdio.h>
#include <errno.h>
#include <string.h>
#include <stddef.h>
#include <stdio.h>      /* printf */
#include <stdlib.h>     /* getenv */
#include <sys/types.h>
#include <dirent.h>
#include <linux/limits.h>
#include <unistd.h>
#include <sys/file.h>
#include <sys/stat.h>
#  include <openssl/md5.h>
#include <signal.h>

FILE* lock_file;
FILE* file_data;
int mode = 0;
int count = 0;

#define dir_path "/sandbox/"


ssize_t recv_until(int fd, char *buf, size_t n) {
    ssize_t rc;
    size_t nread = 0;
    while (nread < n) {
        rc = read(fd, &buf[nread], 1);
        if (rc == -1) {
            if (errno == EAGAIN || errno == EINTR) {
                continue;
            }
            return -1;
        }
        if (rc == 0) {
            break;
        }
        if(buf[nread] == '\n')
            break;
        nread += rc;

    }
    return nread;
}

ssize_t write_all(int fd, char *buf, size_t n) {
    ssize_t rc;
    size_t nread = 0;
    while (nread < n) {
        rc = write(fd, buf + nread, n - nread);
        nread += rc;
    }
    return nread;
}


int recv_integer(){
    char buf[1024] ={0};
    printf("> ");
    unsigned int tmp=0;
    recv_until(0,buf,1023);
    tmp = atoi(buf);
    return tmp;
}
void print_menu(){
    puts("————————————————————————————————————————————————————————————");
    puts("\t🃏\t🄷 🄾 🅄 🅂 🄴  🄾 🄵  🄲 🄰 🅁 🄳 🅂\t🃏");
    puts("————————————————————————————————————————————————————————————");
    puts("1♠ Write");
    puts("2♥ Read");
    puts("3♦ Go");
    puts("4♣ Exit");
}

char *str2md5(const char *str, int length) {
    int n;
    MD5_CTX c;
    unsigned char digest[16];
    char *out = (char*)malloc(33);
    MD5_Init(&c);
    MD5_Update(&c, str, length);
    MD5_Final(digest, &c);
    for (n = 0; n < 16; ++n) {
        snprintf(&(out[n*2]), 16*2, "%02x", (unsigned int)digest[n]);
    }
    return out;
}

int main(int argc, char* argv[], char* envp[]){
char buffer[1024];
char file_name_data[256];
char key[33];
char pending_path[PATH_MAX];
char current_path[PATH_MAX];
char* md5_path;


alarm(60);
setvbuf(stdin, NULL, _IONBF, 0);
setvbuf(stdout, NULL, _IONBF, 0);
// mkdir(dir_path, 0700);
chdir(dir_path);

char* REMOTE_HOST = getenv("REMOTE_HOST");
snprintf(current_path,sizeof(current_path) - 1,"%s%s/",dir_path,REMOTE_HOST);
mkdir(current_path,0700);
snprintf(pending_path,sizeof(pending_path) - 1,"%s%s/pending",dir_path,REMOTE_HOST);

lock_file = fopen(pending_path, "w+");
int lock = flock(fileno(lock_file), LOCK_EX | LOCK_NB);
if (lock == -1) {
    printf("Nope!\n"); // lock mitm
    exit(1);
}



// printf("Sandbox: %s\n",current_path);
while(1){
    // printf("buffer: %s\n",buffer);
if(count > 2){
    printf("This is DEMO version\nPlease purchase a full version\n");
    goto ret;
}

print_menu();
switch(recv_integer()){
case 1:
    // write
    if(file_data || mode > 0) break;
    if(count++ > 1) break;
    printf("Enter file name: ");
    memset(file_name_data,0,sizeof(file_name_data));
    recv_until(0,file_name_data,255);
    md5_path = str2md5(file_name_data,strlen(file_name_data));
    snprintf(current_path,sizeof(current_path) - 1, "%s%s/%s",dir_path,REMOTE_HOST,md5_path); // tmp data
    printf("Writing: %s\n",current_path);
    file_data = fopen(current_path,"w+");
    if(!file_data){
        puts("Can't open file");
        goto ret;
    }
    mode = 1;
    break;
case 2:
    // open
    if(file_data || mode > 0) break;
    if(count++ > 1) break;
    printf("Enter file name: ");
    memset(file_name_data,0,sizeof(file_name_data));
    recv_until(0,file_name_data,255);
    md5_path = str2md5(file_name_data,strlen(file_name_data));
    snprintf(current_path,sizeof(current_path) - 1, "%s%s/%s",dir_path,REMOTE_HOST,md5_path); // tmp data
    printf("Reading: %s\n",current_path);
    file_data = fopen(current_path,"r");
    if(!file_data){
        puts("No such file");
        goto ret;
    }
    mode = 2;
    break;
case 4:
    goto ret;
    break;
case 3:
    // key

    if(mode == 1){
    // write mode
        printf("Size data");
        int size_data = recv_integer();
        if(size_data > 1024) size_data = 1024;
        printf("Data> ");
        memset(buffer,0,sizeof(buffer));
        recv_until(0,buffer, size_data & 0xffffffff);
        fseek( file_data , 0 , SEEK_SET );
        fwrite(buffer,size_data & 0xffffffff,1,file_data);
        printf("Key> ");
        // memset(buffer,0,sizeof(buffer));
        memset(key,0,sizeof(key));
        recv_until(0,key,16);
        char* md5_path = str2md5(key,16);
        fwrite(md5_path,1,32,file_data);
        fclose(file_data);
        file_data = NULL;
        mode = 0;

        struct stat st;
        stat(current_path, &st);
        int size = st.st_size;
        printf("%d written bytes\n",size);
    }
    if(mode == 2){
        // read mode
        struct stat st;
        stat(current_path, &st);
        int size = st.st_size;
        fseek( file_data , size - 32 , SEEK_SET );

        memset(buffer,0,sizeof(buffer));
        fread(buffer,1,32 & 0xffffffff,file_data);
        printf("Enter key> ");
        memset(key,0,sizeof(key));
        recv_until(0,key,16);
        char* md5_path = str2md5(key,16);
        if(strncmp(md5_path,buffer,32) !=0){
            puts("Wrong key");
            goto ret_read;
        }
        fseek ( file_data ,0 , SEEK_SET );
        char* output = malloc(size+1);
        fread (output,1,size & 0xffffffff,file_data);
        printf("Your data (size: %d):\n",size);
        write_all(1,output,size & 0xffffffff);

ret_read:
        fclose(file_data);
        printf("\n--------------\nNow your file is going be deleted.\nWe hope you are satisfied with our services :)\n");
        unlink(current_path);
        file_data = NULL;
        mode = 0;
        // goto ret;
    }

    break;

default:
    break;
}
}

ret:

    printf("\nBye!\n");
    flock(fileno(lock_file), LOCK_UN);  // Unlock the file . . .
    fclose(lock_file);
    return 0;
}
