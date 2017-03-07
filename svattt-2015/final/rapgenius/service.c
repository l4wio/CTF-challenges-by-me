#include <stdio.h>
#include <stdlib.h>
#include <string.h>
/*
gcc -m32 service.c -o service
strip service
*/


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

void intro(){
	puts("\n\n\t\tRAP.GENIUS\n\n");
	puts("Genius (formerly Rap Genius) is an online knowledge base.");
	puts("The site allows users to provide annotations and interpretation of song lyrics,");
	puts("news stories, primary source documents, poetry, and other forms of text.");
	
}

void menu(){
	puts("----------------MENU----------------");
	puts("1. New");
	puts("2. Show");
	puts("3. Delete");
	puts("4. Create playlist");
	puts("5. Load playlist");
	puts("6. Play");
	puts("7. Save playlist");
	puts("8. Exit");
}

int recv_integer(){
	printf("> ");
	int tmp=0;
	scanf("%d",&tmp);
	return tmp;
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


typedef struct song_struct{
	unsigned int type;
	unsigned int id;
	char song_name[256];
	char artist[256];
	char* lyric;
} SONG;

typedef struct playlist_struct{
	unsigned int type;
	unsigned int id;
	char playlist_name[256];
	unsigned int sum;
	SONG* song_list[256];
} PLAYLIST;

int MAX = 256;
SONG* SONGS_LIST[256];
int SUM_SONGS = 256;
char* REMOTE_ADDR;
PLAYLIST* this_playlist=0;
int PLAYLIST_CREATED = 0;
int PLAYLIST_LOADED = 0;
char BUFFER_2048[2048];

FILE* fp;

void new(){
	char buffer[512];
	
	if(SUM_SONGS){
		SONG* this = calloc(1,sizeof(SONG));	
		SONGS_LIST[MAX-SUM_SONGS] = this;
		SUM_SONGS--;
		this->type = 0; // 0=song, 1=playlist
		this->id = MAX-SUM_SONGS;
		printf("Name: ");memset(buffer,'\0',512);recv_string(buffer,256);
		memcpy(this->song_name,buffer,256);
		printf("Artist: ");memset(buffer,'\0',512);recv_string(buffer,256);
		memcpy(this->artist,buffer,256);
		
		printf("size");
		int size_ = recv_integer();
		if(size_ && size_ <= 2048){
			char* lyric_ = malloc(size_);
			printf("Lyric: ");
			read(0,lyric_,size_);
			lyric_[size_] = '\0';
			this->lyric = lyric_;
		} else {
			puts("wassup? niggia");
		}
	}
}
void show(){
	printf("ID");
	int id = recv_integer();
	if(!(id<0) && id < (MAX - SUM_SONGS)){
		SONG* this = SONGS_LIST[id];
		if(this){
			printf("\n\n\t\t%s\n",this->song_name);
			printf("\t\tBy. %s\n",this->artist);
			printf("\n%s\n\n",this->lyric);
		}
	}else{
		puts("Not exists!");
	}
}
void delete(){
	printf("ID");
	int id = recv_integer();
	if(!(id<0) && id < (MAX - SUM_SONGS)){
		free(SONGS_LIST[id]->lyric);
		free(SONGS_LIST[id]);
		SONGS_LIST[id] = 0;
		puts("Done!");
	}else{
		puts("Not exists!");
	}
}
void create_playlist(){
	int i,id,n;
	char buffer[512];
	char path[512];
	
	
	if(this_playlist){
		puts("You've already have this one.");
		return;
	}

	puts("######## TRACK LIST ########");
	for(i = 0; i < (MAX - SUM_SONGS); i++){
		SONG* this = SONGS_LIST[i];
		if(this)
			printf("[%d] %s - %s\n",i,this->song_name,this->artist);
	}
	puts("");
	
	printf("Playlist's name: ");memset(buffer,'\0',512);recv_string(buffer,256);
	for(i= 0;i<256;i++){
		if(buffer[i] == '.') buffer[i] = '\0';
		if(buffer[i] == '/') buffer[i] = '\0';
	}
	
	
	this_playlist = calloc(1,sizeof(PLAYLIST));
	memcpy(this_playlist->playlist_name,buffer,256);
			
	printf("Which one? (please type -1 when you're done)\n");
	
	this_playlist->sum = 0;
	
	for(n=0;n<256;n++){
		printf("ID");
		id = recv_integer();
		if(id < 0)
			break;
		if(id < (MAX - SUM_SONGS)){
			this_playlist->song_list[this_playlist->sum++] = SONGS_LIST[id];
			puts("Added");
		} else {
			puts("Not exists!");
		}
		
	}
	snprintf(path,512,"/tmp/%s_%s.rpl",REMOTE_ADDR,buffer);
	printf("[DEBUG] Path: %s\n",path);
	FILE* f = fopen(path,"wb");
	if(f) fp = f;
	
}
void load_playlist(){
	char buffer[512];
	char path[512];

	
	
	printf("Playlist's name: ");memset(buffer,'\0',512);recv_string(buffer,256);
	snprintf(path,512,"/tmp/%s_%s.rpl",REMOTE_ADDR,buffer);
	printf("[DEBUG] Path: %s\n",path);
	
	FILE* f = fopen(path,"rb");
	if(f) fp = f;
	fread(BUFFER_2048,1,2048,fp);
	fclose(fp);	
	puts("Loaded");
	PLAYLIST_LOADED = 1;
	
}
void play(){
	int i;
	if(!this_playlist && !PLAYLIST_LOADED){
		printf("You don't have any one, niggia!\n");
		return;
	}
	
	if(PLAYLIST_LOADED){
		puts(BUFFER_2048);
		PLAYLIST_LOADED = 0;
	} else{
	
		printf("\n%s\n\n",this_playlist->playlist_name);
		
		for(i=0;i<this_playlist->sum;i++){
			SONG* this = this_playlist->song_list[i];
			if(this)
				printf("[%d] %s - %s\n",i,this->song_name,this->artist);
		}
	
	
	}
	puts("\nEnjoy your music :)\nPlaying >...\n");
	sleep(3);
	
}
void save(){
	if(!this_playlist) return;
	int i;
	char buffer[1024];
	memset(buffer,'\0',1024);
	snprintf(buffer,256,"%s\n\n",this_playlist->playlist_name);
	fwrite(buffer,1,strlen(buffer),fp);
	
	
	for(i=0;i<this_playlist->sum;i++){
		SONG* this = this_playlist->song_list[i];
		if(this){
			memset(buffer,'\0',1024);
			snprintf(buffer,1024,"[%d] %s - %s\n",i,this->song_name,this->artist);
			fwrite(buffer,1,strlen(buffer),fp);
		}
	}
	
	free(this_playlist);
	this_playlist = 0;
	fclose(fp);
	puts("Saved!");
}



int main(){
	setvbuf(stdout, NULL, _IONBF, 0);
	REMOTE_ADDR = getenv("REMOTE_HOST");
	alarm(60);
	
	
	intro();
	
	int exit_flag = 0;
	while(!exit_flag){
		menu();
		switch(recv_integer()){
			case 1:
				new();
				break;
			case 2:
				show();
				break;
			case 3:
				delete();
				break;
			case 4:
				create_playlist();
				break;
			case 5:
				load_playlist();
				break;
			case 6:
				play();
				break;
			case 7:
				// save playlist
				save();
				break;
			default:
				exit_flag=1;
				break;
			
		}
	}	
}