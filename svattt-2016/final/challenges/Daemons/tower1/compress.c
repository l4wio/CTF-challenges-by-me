#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <openssl/sha.h>


#define POC_LENGTH 1024
unsigned char BUFFER[POC_LENGTH*4] = {0};
unsigned char* pointer = BUFFER;
uint64_t tmp;

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

char* read_file_length(char* file,size_t s){
    FILE* f = fopen(file,"rb");
    char* ret = malloc(s+1);
    if(ret == NULL) perror("failed");
    if (fread(ret,1,s,f) != s) perror("failed");
    fclose(f);
    ret[s] = '\0';
    return ret;
}

#define write_int8(a)  tmp=a; memcpy(pointer,&tmp,1);  pointer += 1;
#define write_int16(a) tmp=a; memcpy(pointer,&tmp,2);  pointer += 2;
#define write_int32(a) tmp=a; memcpy(pointer,&tmp,4);  pointer += 4;
#define write_bytes(d,s) memcpy(pointer,d,s);  pointer += s;
#define write_string(s) memcpy(pointer,s,strlen(s));  pointer += strlen(s);

void init(){
    setvbuf(stdout, NULL, _IONBF, 0);
    alamr(30);
    chdir("/home/tower1/");
}

void header(){
    write_string("LZWIO\x7f");
    write_bytes("\x00\x00\x00\x00",4);
}

void do_compress(unsigned char* in,size_t in_len,unsigned char* key,size_t key_len){

    uint32_t frequency[256] = {0};
    uint32_t i,n,x=0,max=0;
    uint8_t offset=0;
    uint8_t h = 0;
    unsigned char* p;
    char buf[POC_LENGTH*3] = {0};
    for(i = 0 ; i < in_len; i++)
        frequency[ (unsigned char) in[i] ]++; // scan
    for(i = 0 ; i < 256; i++)
        if(frequency[i] > frequency[max]) max = i;
    for(i = 0 ; i < key_len ; i++)
        h ^= key[i];

    // printf("[debug] %02x: %d %02x\n",max,frequency[max],h);

    write_int16(in_len);
    write_int16(key_len);
    write_int8(max); // ^ h

    for(i = 0; i < in_len ; i+=8){
        offset = 0;
        for(n = 0; n < 8;n++){
            offset = offset << 1;
            if (in[n+i] == max) {
                offset |=  1;
            } else {
                offset |=  0;
                buf[x++] = in[n+i] ^ h ;
            }
        }
        // printf("%08lX\n",offset);
        write_int8(offset);
    }
    write_int32(0xFEEDDEAD);
    write_int32(0x054DB01);
    write_bytes(buf,x);

}

int main(){
    char sign[128] = {0};
    uint32_t i,tmp;
    init();
    header();
    unsigned char* PoC = read_file_length("poc",POC_LENGTH);
    unsigned char hash[SHA_DIGEST_LENGTH];
    SHA1((const unsigned char*)PoC, POC_LENGTH, hash);

    FILE* dev_null = fopen("/dev/null","wb");
    if(dev_null == NULL) exit(-1);
    fprintf(dev_null,"SVATTT{");
    for(i=0;i<SHA_DIGEST_LENGTH;i++){
        fprintf(dev_null,"%02x",hash[i]);
    }
    fprintf(dev_null,"}");
    fclose(dev_null);
    printf("Enter your signature: ");
    size_t n = read(0,sign,128);

    unsigned char* b64_poc = calloc(1,Base64encode_len( POC_LENGTH ) + 1 + n );
    uint32_t b64_poc_len = Base64encode(b64_poc,PoC,POC_LENGTH);
    memcpy(b64_poc + b64_poc_len, sign, n);

    write_int32(POC_LENGTH);

    do_compress(b64_poc,b64_poc_len + n ,hash,SHA_DIGEST_LENGTH);

    write_bytes("\xff\xff\xff\xff",4);

    for(i=0;i<(pointer-BUFFER);i++)
        printf("%02x",BUFFER[i]);
    puts("");
    printf("size: %d\n",i);
}