
#include "crypto.h"
#include <stdio.h>
#include <stdint.h>
#define ANSI_COLOR_RED     "\x1b[31m"
#define ANSI_COLOR_GREEN   "\x1b[32m"
#define ANSI_COLOR_YELLOW  "\x1b[33m"
#define ANSI_COLOR_BLUE    "\x1b[34m"
#define ANSI_COLOR_MAGENTA "\x1b[35m"
#define ANSI_COLOR_CYAN    "\x1b[36m"
#define ANSI_COLOR_GRAY    "\x1b[90m"
#define ANSI_COLOR_RESET   "\x1b[0m"

#define BLOCK_SIZE 8

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

unsigned char HEX_TABLE[256] = {
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, -1, -1, -1, -1, -1, -1,
  -1, 10, 11, 12, 13, 14, 15, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, 10, 11, 12, 13, 14, 15, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1
};


typedef struct cipher_block{
  unsigned char* plain;
  unsigned char* cipher;
  _CTX* ctx;
  size_t num_blocks;
  size_t len_plain;
  size_t len_cipher;
} CIPHER;

void hex_to_bin(char* input,unsigned char* output){
  int i;
  if(strlen(input) % 2 != 0) return;
  for(i=0;i<strlen(input);i+=2)
    output[i/2] = (unsigned char)(HEX_TABLE[input[i]]<<4) | (unsigned char)HEX_TABLE[input[i+1]];
  return;
}

unsigned int pad(CIPHER* c){
  size_t num_pad = BLOCK_SIZE - (c->len_plain % BLOCK_SIZE);
  c->plain[ (c->num_blocks * BLOCK_SIZE) - 1 ] = (unsigned char)num_pad;
  return num_pad;
}

unsigned int unpad(CIPHER* c){
  size_t num_pad = c->plain[ (c->num_blocks * BLOCK_SIZE) - 1 ];
  c->len_plain = (c->num_blocks*BLOCK_SIZE) - num_pad ;
  memset(c->plain+c->len_plain,0,num_pad);
  return num_pad;
}

int encrypt(CIPHER* c){
  int i;
  unsigned long L,R;
  pad(c);
  for(i=0;i<c->num_blocks;i++){
    memcpy(&L,c->plain + i*BLOCK_SIZE ,BLOCK_SIZE/2);
    memcpy(&R,c->plain + i*BLOCK_SIZE + (BLOCK_SIZE/2),BLOCK_SIZE/2);
    _Encrypt(c->ctx, &L, &R);
    memcpy(c->cipher + i*BLOCK_SIZE ,&L,BLOCK_SIZE/2);
    memcpy(c->cipher + i*BLOCK_SIZE + (BLOCK_SIZE/2),&R,BLOCK_SIZE/2);

  }
}

int decrypt(CIPHER* c){
  int i;
  unsigned long L,R;
  // _Init ( c->ctx , key , key_len);r
  for(i=0;i<c->num_blocks;i++){
    memcpy(&L,c->cipher + i*BLOCK_SIZE ,BLOCK_SIZE/2);
    memcpy(&R,c->cipher + i*BLOCK_SIZE + (BLOCK_SIZE/2),BLOCK_SIZE/2);
    // printf("decrypting: %08lX %08lX\n",L,R);
    _Decrypt(c->ctx, &L, &R);
    memcpy(c->plain + i*BLOCK_SIZE ,&L,BLOCK_SIZE/2);
    memcpy(c->plain + i*BLOCK_SIZE + (BLOCK_SIZE/2),&R,BLOCK_SIZE/2);
    // printf("decrypted : %08lX %08lX\n",L,R);
  }
  unpad(c);
}
void intro(){
  printf(ANSI_COLOR_GRAY);
  puts(READFILE("intro.txt"));
  puts("Ngọn cờ để chiến thắng thấp thoáng trên đỉnh lâu đài");
  puts("một khi chiếm được nó, bạn sẽ biến trò chơi vương quyền 👑  này thành ác mộng cho tất thảy những kẻ thua cuộc kia.");
  puts("Bước thật chậm rãi lên cây cầu, dẫn qua con kênh để tiến vào cổng.");
  sleep(1);
  puts(".");
  sleep(1);
  puts(".");

  puts("Bỗng dưng, tất cả cánh cửa đóng sập một cách bất ngờ và khó hiểu.");
  sleep(2);
  puts("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
  puts(READFILE("intro2.txt"));
  puts("Bạn tỉnh dậy trong một căn phòng tối mịt, cùng những âm thanh rùng rợn từ những vật thể trong bóng đêm");
  puts("chút ánh sáng lẻ loi, bạn với tay cầm lấy ngọn đuốc 🔥  chỉ đủ để soi thấy bàn chân của mình...");
  printf(ANSI_COLOR_RESET);

}
void print_menu(){
  printf(ANSI_COLOR_MAGENTA);
  puts("+------------------------------------+");
  puts("|👻                 \u2191                 |");
  puts("|                                    |");
  puts("|    \u2190             😱           \u2192     |");
  puts("|                                    |");
  puts("|                  \u2193               👾 |");
  puts("+------------------------------------+");
  printf(ANSI_COLOR_RESET);
}
void do_set_key(CIPHER** c);

void do_encrypt(CIPHER** c){

  char buf[512/2];
  char buf_hex[512];
  int i,n;
  int hex_encoded = 1;
  do_set_key(c);
  CIPHER* this = *c;
  printf("🗝  Tra chìa khóa vào 🚪  bên trái: ");
  scanf("%512s",buf_hex);
  if(!strlen(buf_hex)) return;
  for(i=0;i<strlen(buf_hex);i++){
    if(HEX_TABLE[(unsigned char)buf_hex[i]] == 0xff){
      hex_encoded = 0;
      break;
    }
  }
  if(hex_encoded){
    hex_to_bin(buf_hex,buf);
  }
  //
  this->len_plain = hex_encoded ? strlen(buf_hex)/2 : strlen(buf_hex);
  this->num_blocks = (this->len_plain/BLOCK_SIZE) + 1;
  this->plain = realloc(this->plain ,this->num_blocks * BLOCK_SIZE);
  memset(this->plain,0,this->num_blocks * BLOCK_SIZE);
  memcpy(this->plain,hex_encoded ? buf : buf_hex,this->len_plain);
  this->len_cipher = this->num_blocks * BLOCK_SIZE;
  this->cipher = realloc(this->cipher,this->len_cipher);
  memset(this->cipher,0,this->len_cipher);
  //
  encrypt(this);
  printf(ANSI_COLOR_GREEN);
  puts("Bạn tìm thấy trong căn phòng một rương chứa đồ...");
  for(i = 0; i < this->num_blocks; i++){
    for(n=0 ; n < BLOCK_SIZE; n++)
      printf("%02x",this->cipher[(i*BLOCK_SIZE) + n]);
  }
  printf(ANSI_COLOR_RESET "\n");
}

void do_decrypt(CIPHER** c){
  CIPHER* this = *c;
  char buf[512/2];
  char buf_hex[512];
  int i,n;
  do_set_key(c);
  printf("🗝   Tra chìa khóa vào 🚪  bên phải: ");
  scanf("%512s",buf_hex);
  if(!strlen(buf_hex)) return;
  if(strlen(buf_hex) % (BLOCK_SIZE*2) != 0) return;
  hex_to_bin(buf_hex,buf);
  //
  this->len_cipher = strlen(buf_hex)/2;
  this->num_blocks = (this->len_cipher/BLOCK_SIZE);
  this->cipher = realloc(this->cipher,this->num_blocks * BLOCK_SIZE);
  memset(this->cipher,0,this->num_blocks * BLOCK_SIZE);
  memcpy(this->cipher,buf,this->len_cipher );
  this->plain = realloc(this->plain,this->num_blocks * BLOCK_SIZE);
  memset(this->plain,0,this->num_blocks * BLOCK_SIZE);
  this->len_plain = NULL;
  //
  decrypt(this);
  printf(ANSI_COLOR_GREEN);
  puts("Bạn tìm thấy trong căn phòng một rương chứa đồ...");
  for(i = 0; i < this->num_blocks; i++){
    for(n=0 ; n < BLOCK_SIZE; n++)
      printf("%02x",this->plain[(i*BLOCK_SIZE) + n]);
  }
  printf(ANSI_COLOR_RESET "\n");
}

void do_free_key(CIPHER** c);

void corrupted(CIPHER** c){
  char buf[] = ANSI_COLOR_RED "[ \u2620  ] Structure is corrupted or inflected. Heap-related attack detected."ANSI_COLOR_RESET ;
  puts(buf);
  memset(*c,0,sizeof(CIPHER));
}

void do_set_key(CIPHER** c){
  CIPHER* this = *c;

  if( this )
    if (       ((unsigned int)this->plain>>16) == 0x0804
            || ((unsigned int)this->plain>>24) == 0xff
            || ((unsigned int)this->plain>>24) == 0xf7
            || ((unsigned int)this->plain>>24) == 0xbf
            || ((unsigned int)this->cipher>>16) == 0x0804
            || ((unsigned int)this->cipher>>24) == 0xff
            || ((unsigned int)this->cipher>>24) == 0xf7
            || ((unsigned int)this->cipher>>24) == 0xbf
            || (this->len_plain > this->len_cipher) || (this->len_cipher > this->num_blocks*BLOCK_SIZE) ){
    corrupted(c);
    return;
  }
  if(*c == NULL) *c = calloc(1,sizeof(CIPHER));
  this = *c;
  if(this->ctx) return;
  this->ctx = calloc(1,sizeof(_CTX));
  char buf[32];
  char buf_hex[64];
  int i;
  int hex_encoded = 1;
  printf("Vui lòng chọn chìa khóa 🗝  : ");
  scanf("%64s",buf_hex);
  for(i=0;i<strlen(buf_hex);i++){
    if(HEX_TABLE[(unsigned char)buf_hex[i]] == 0xff){
      hex_encoded = 0;
      break;
    }
  }
  if(hex_encoded){
    hex_to_bin(buf_hex,buf);
  }
  _Init ( this->ctx , hex_encoded ? buf : buf_hex ,
    hex_encoded ? strlen(buf_hex)/2 : strlen(buf_hex));
}


void do_free_key(CIPHER** c){
  CIPHER* this = *c;
  if(!this) return;
  if(this->ctx) {
    free(this->ctx);
  }
  memset(this,0,sizeof(CIPHER));
  // free(this);
  *c = NULL;
  puts("Bạn quyết định vứt chìa khóa 🗝   đi");
}
void main(void) {
  int i,n;
  char cmd[2];
  CIPHER* c = NULL;
  chdir("/home/castle/");
  setvbuf(stdout, NULL, _IONBF, 0);
  alarm(60);
  intro();
  print_menu();
  while(1){

    // printf("cipher: %p\n",c);
    printf("😱 🔥   ");
    scanf("%01s",cmd);
    switch(*cmd){
      case '^':
      case 'w':
      case 'W':
        printf("* Tiến tới một bước...\n");
        do_set_key(&c);
        break;
      case 'v':
      case 'V':
      case 's':
      case 'S':
        printf("* Bước lùi một bước...\n");
        do_free_key(&c);
        break;
      case '<':
      case 'a':
      case 'A':
        printf("* Sang trái một bước...\n");
        do_encrypt(&c);
        break;
      case '>':
      case 'd':
      case 'D':
        printf("* Sang phải một bước...\n");
        do_decrypt(&c);
        break;
      default:
        puts(  "Run, Forrest, Run away!" );
        exit(-1);
        break;
    }

  }

}