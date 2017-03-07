/*
gcc -m32 server.c -o server
strip server
*/

#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <ncurses.h>
#include <time.h>
#include <stdint.h>

#define WIDTH 40
#define HEIGHT 10 

typedef struct pokemon_struct{
	uint8_t id;
	char name[128];
	char height[128];
	char weight[128];
	char gender[128];
	char type[128];
	char path[512];

} POKEMON;
uint8_t SUM_POKEMON = 0;
POKEMON* POKEMON_LIST[256];



int startx = 0;
int starty = 0;
WINDOW *menu_win;
WINDOW *menu_win2;
FILE* fp;


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
void ADD_POKEMON(char* name,char* height,char* weight,char* gender,char* type,char *path){

	POKEMON* this = calloc( 1,sizeof(POKEMON));

	this->id = SUM_POKEMON;
	strcpy(this->name,name);
	strcpy(this->height,height);
	strcpy(this->weight,weight);
	strcpy(this->gender,gender);
	strcpy(this->type,type);
	strcpy(this->path,path);
	
	POKEMON_LIST[SUM_POKEMON++] = this;
}

void INIT(){
	ADD_POKEMON("Pikachu","1' 04\"","13.2 lbs","Male - Female","Electric","./data/pikachu.txt");
	ADD_POKEMON("Bulbasaur","2' 04\"","15.2 lbs","Male - Female","Grass","./data/Bulbasaur.txt");
	ADD_POKEMON("Ditto","1' 00\"","8.8 lbs","Male - Female","Normal","./data/Ditto.txt");
	ADD_POKEMON("Geodude","1' 04\"","44.1 lbs","Male - Female","Rock","./data/geodude.txt");
	ADD_POKEMON("Psyduck","2' 07\"","43.2 lbs","Male - Female","Water","./data/psyduck.txt");
	ADD_POKEMON("Doge","?","hm","Male - Female :troll:","Doge","./data/doge.txt");
}

void show_pokemon(uint8_t id);

void recv_string(WINDOW *win,int start,char* buffer,size_t size){
	unsigned int i = 0;
	unsigned char tmp=0;
	for(i=0;i<(size-1);i++){
		tmp = wgetch(win);
		if(tmp == 10 || tmp == -1) break;
		buffer[i] = tmp;
		mvwprintw(win,0,start, "%s",buffer);

	}
	buffer[i] = '\0';
}

void search_pokemon(){
	char* name = malloc(256); memset(name,'\0',256);
	wclear(menu_win2);
	mvwprintw(menu_win2,0,0, "Name: ");
	wrefresh(menu_win2);
	recv_string(menu_win2,6,name,128);

	uint8_t i;
	for(i=0;i<SUM_POKEMON;i++){
		POKEMON* this = POKEMON_LIST[i];
		if(strstr(this->name,name)){
			show_pokemon(this->id);
			break;
		}
	}
	if(i == SUM_POKEMON){
		mvwprintw(menu_win2,1,0, "Not found :(");
		wrefresh(menu_win2);
	}

	free(name);

}
void delete_pokemon(){
	char* id_ = malloc(8); memset(id_,'\0',8);
	uint8_t id;
	wclear(menu_win2);
	mvwprintw(menu_win2,0,0, "ID: ");
	wrefresh(menu_win2);
	recv_string(menu_win2,4,id_,8);
	id = (uint8_t)atoi(id_);
	uint8_t i;

	for(i=0;i<SUM_POKEMON;i++){
		POKEMON* this = POKEMON_LIST[i];
		if(id == i){
				memset(this,'\0',malloc_usable_size(this));
				strcpy(this->path,"./data/doge.txt");
				wattron(menu_win2,COLOR_PAIR(2));
				mvwprintw(menu_win2,1,0, "Okay");
				wattroff(menu_win2,COLOR_PAIR(2));
			
		}
	}

}
int do_add_pokemon(){
	char* name = malloc(128); memset(name,'\0',128);
	char* height = malloc(128); memset(height,'\0',128);
	char* weight = malloc(128); memset(weight,'\0',128);
	char* gender = malloc(128); memset(gender,'\0',128);
	char* type = malloc(128); memset(type,'\0',128);
	char* size = malloc(8); memset(size,'\0',8);
	char tmp[4];
	size_t size_ = 0;
	char* data;
	
	

	wclear(menu_win2);
	mvwprintw(menu_win2,0,0, "Name: ");
	wrefresh(menu_win2);
	recv_string(menu_win2,6,name,128);

	wclear(menu_win2);
	mvwprintw(menu_win2,0,0, "Height: ");
	wrefresh(menu_win2);
	recv_string(menu_win2,8,height,128);

	wclear(menu_win2);
	mvwprintw(menu_win2,0,0, "Weight: ");
	wrefresh(menu_win2);

	recv_string(menu_win2,8,weight,128);
	wclear(menu_win2);
	mvwprintw(menu_win2,0,0, "Gender: ");
	wrefresh(menu_win2);
	recv_string(menu_win2,8,gender,128);

	wclear(menu_win2);
	mvwprintw(menu_win2,0,0, "Type: ");
	wrefresh(menu_win2);
	recv_string(menu_win2,6,type,128);

	wclear(menu_win2);
	mvwprintw(menu_win2,0,0, "Size: ");
	wrefresh(menu_win2);
	recv_string(menu_win2,6,size,8);
	size_ = (unsigned int)atoi(size);
	if ((unsigned int)size_ <= 2048 && size_){
		data = malloc(size_);
		memset(data,'\0',size_);
	} else {
		wattron(menu_win2,COLOR_PAIR(8));
		mvwprintw(menu_win2,1,0, "Failed");
		wattroff(menu_win2,COLOR_PAIR(8));
	}

	if(data){
		

		char path[1024];
		memset(path,'\0',1024);
		snprintf(path,1024,"/tmp/%d_%d_%s.txt",rand(),time(0),name);
		fp = fopen(path, "w");
		if(!fp){
			goto exit_;
		}
		wclear(menu_win2);
		mvwprintw(menu_win2,0,0, "Can you draw a picture of him/her? ");
		wrefresh(menu_win2);
		recv_string(menu_win2,35,data,size_);
		fwrite(data,1,size_,fp);
		
		fclose(fp);
		
		ADD_POKEMON(name,height,weight,gender,type,path);
		
		wclear(menu_win2);
		mvwprintw(menu_win2,0,0, "Do you want to add another one? (Y/N): ");
		wrefresh(menu_win2);
		recv_string(menu_win2,39,tmp,2);
	
		if(tmp[0] == 'Y' || tmp[0] == 'y'){
			free(name);
			free(height);
			free(weight);
			free(gender);
			free(type);
			free(size);
			return 1;
		}
		
	}

	
	exit_:
		free(name);
		free(height);
		free(weight);
		free(gender);
		free(type);
		free(size);

	return 0;


}
void show_pokemon(uint8_t id){

	POKEMON* this = POKEMON_LIST[id];
	wattron(menu_win2,COLOR_PAIR(4));
	mvwprintw(menu_win2,1,0, "Height: %s - Weight: %s",this->height,this->weight);
	wattroff(menu_win2,COLOR_PAIR(4));
	wattron(menu_win2,COLOR_PAIR(2));
	mvwprintw(menu_win2,2,0, "Gender: %s",this->gender);
	wattroff(menu_win2,COLOR_PAIR(2));
	wattron(menu_win2,COLOR_PAIR(6));
	mvwprintw(menu_win2,3,0, "Type: %s",this->type);
	wattroff(menu_win2,COLOR_PAIR(6));

	mvwprintw(menu_win2,5,0, "%s",READFILE(this->path));

}


void show_all_pokemon(){
	uint8_t i;
	int c=0;
	for(i=0;i<SUM_POKEMON;i++){
		wclear(menu_win2);
		mvwprintw(menu_win2,4,0, "Press [n] to show the next one!");
		show_pokemon(i);
		wrefresh(menu_win2);
		do {
			c = wgetch(menu_win2);
		}while(!(c == 110));
	}
	wclear(menu_win2);
	wrefresh(menu_win2);
	
}

char *choices[] = { 
			"Search",
			"Add","Delete",
			"Random",
			"All",
			"Exit",
		  };
int n_choices = sizeof(choices) / sizeof(char *);
void print_menu(WINDOW *menu_win, int highlight);

int main()
{	
	chdir("/home/noname/Workspace/SVATTT/final/exploit/pokedex/");
	int highlight = 1;
	int choice = 0;
	int c;
	char tmp[4];
	srand(time(0));
	initscr();
	start_color();
	init_pair(1,COLOR_BLUE , COLOR_BLACK);
	init_pair(2,COLOR_GREEN , COLOR_BLACK);
	init_pair(3, COLOR_WHITE,COLOR_BLACK );
	init_pair(4, COLOR_CYAN,COLOR_BLACK );
	init_pair(5, COLOR_BLACK, COLOR_BLACK);
	init_pair(6,COLOR_MAGENTA ,COLOR_BLACK );
	init_pair(7, COLOR_YELLOW, COLOR_BLACK);
	init_pair(8, COLOR_RED, COLOR_BLACK);
	INIT();

	clear();
	noecho();
	cbreak();	/* Line buffering disabled. pass on everything */
	startx = 10;
	starty = 15;
	

	menu_win = newwin(10, 40, starty, startx);
	menu_win2 = newwin(40, 110, 3, 70);

	keypad(menu_win, TRUE);
	attron(COLOR_PAIR(7));
	mvprintw(0, 0, "%s",READFILE("intro.txt"));
	attroff(COLOR_PAIR(7));
	refresh();
	print_menu(menu_win, highlight);
	bool exit_flag = 0;
	while(1)
	{	c = wgetch(menu_win);
		switch(c)
		{	case 119:
				if(highlight == 1)
					highlight = n_choices;
				else
					--highlight;
				break;
			case 115:
				if(highlight == n_choices)
					highlight = 1;
				else 
					++highlight;
				break;
			case 0x20:

				choice = highlight;
				wclear(menu_win2);
				mvprintw(25, 0, "[%d] You've chosen [%s]\n",choice, choices[choice - 1]);
				refresh();
				switch(choice){
					case 1:
						search_pokemon();
						break;
					case 2:
						do
							{
								;
							}while(do_add_pokemon());
						break;
					case 3:
						delete_pokemon();
						break;
					case 4:
						show_pokemon(rand()%SUM_POKEMON);
						break;
					case 5:
						show_all_pokemon();
						break;
					default:
						exit_flag = true;
						break;
				}
				wrefresh(menu_win2);
				refresh();
				break;
			default:
				//mvprintw(26, 0, "Charcter pressed is = %3d Hopefully it can be printed as '%c'", c, c);
				//refresh();
				break;

		}


		print_menu(menu_win, highlight);
		if(exit_flag) break;
	}	
	
	clrtoeol();
	refresh();
	endwin();
	return 0;
}


void print_menu(WINDOW *menu_win, int highlight)
{
	int x, y, i;	

	x = 2;
	y = 2;
	box(menu_win, 0, 0);
	for(i = 0; i < n_choices; ++i)
	{	if(highlight == i + 1) /* High light the present choice */
		{	wattron(menu_win, A_REVERSE); 
			mvwprintw(menu_win, y, x, "%s", choices[i]);
			wattroff(menu_win, A_REVERSE);
		}
		else
			mvwprintw(menu_win, y, x, "%s", choices[i]);
		++y;
	}
	wrefresh(menu_win);
}
