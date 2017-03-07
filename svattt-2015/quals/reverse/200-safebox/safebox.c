/* 
clang -m32 rev100.c -o rev100 -lncurses; ./rev100
strip rev100
 */
#include <stdio.h>
#include <ncurses.h>

#define WIDTH 21
#define HEIGHT 10 

int startx = 0;
int starty = 0;

char *choices[] = { 
			"0","1","2","3",
			"4","5","6","7",
			"8","9","A","B",
			"C","D","E","F"
		  };
char *values[] = { 
			"\x00","\x01","\x02","\x03",
			"\x04","\x05","\x06","\x07",
			"\x08","\x09","\x0a","\x0b",
			"\x0c","\x0d","\x0e","\x0f"
		  };
int n_choices = sizeof(choices) / sizeof(char *);
char KEY[10];
char KEY_HEX[10];
unsigned int N_STAGE[6];
char TOKEN[5]="\x00\x00\x00\x00\x00";
void print_menu(WINDOW *menu_win, int highlight);


int stage1(char c){
	N_STAGE[0] = rand() % 16;
	
	unsigned int result = N_STAGE[0];
	//mvprintw(11, 30, "Stage1: %u",result);
	
	return ((N_STAGE[0]^c) == 0);
}
int stage2(char c){
	N_STAGE[1] = rand() % 16;
	
	unsigned int result = ((N_STAGE[0] << 3) % N_STAGE[1]);
	//mvprintw(12, 30, "Stage2: %u",result);
	
	return (result== c);
}
int stage3(char c){
	N_STAGE[2] = rand() % 16;
	unsigned int result = ((N_STAGE[0] + N_STAGE[1] + N_STAGE[2]) % 16);
	//mvprintw(13, 30, "Stage3: %u",result);
	
	return  (result == c);
}
int stage4(char c){
	N_STAGE[3] = rand() % 16;
	unsigned int result = (N_STAGE[0] - N_STAGE[2] + rand())%16;
	//mvprintw(14, 30, "Stage4: %u",result);
	
	return (result == c);
}
int stage5(char c){
	N_STAGE[4] = rand() % 16;
	for(int i = 0; i < N_STAGE[4] ; i++) rand();
	
	unsigned int result = ((rand()%4) * (rand()%5))%16;
	//mvprintw(15, 30, "Stage5: %u",result);
	
	return (result == c);
}
int stage6(char c){
	N_STAGE[5] = rand() % 16;
	for(int i = 0; i < N_STAGE[5] ; i++) rand();
	unsigned int result = (((N_STAGE[0]<<N_STAGE[1])/N_STAGE[2])*N_STAGE[3]*(rand()%5)-(N_STAGE[4]%7)/(N_STAGE[5]%16))%16;
	//mvprintw(16, 30, "Stage6: %u",result);
	
	return (result==c);

}

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

int do_check(char* OTP,char* TOKEN){
	unsigned int TOKEN_INT = strtoul (TOKEN, NULL, 16);
	srand(TOKEN_INT*0x1337);
	unsigned short S1 = stage1(OTP[0]);
	unsigned short S2 = stage2(OTP[1]);
	unsigned short S3 = stage3(OTP[2]);
	unsigned short S4 = stage4(OTP[3]);
	unsigned short S5 = stage5(OTP[4]);
	unsigned short S6 = stage6(OTP[5]);
	
	mvprintw(10, 30, "%u %u %u %u %u %u",S1,S2,S3,S4,S5,S6);
	
	return S1&S2&S3&S4&S5&S6;
}

void get_token(){
int random = 0;
FILE *fp;
fp = fopen("/dev/urandom", "r");
fread(&random, 1, 2, fp);
fclose(fp);
snprintf(TOKEN,5,"%04X",random);
}


int main()
{	WINDOW *menu_win;
	int highlight = 0;
	int choice = 0;
	int c;
	int n=0;
	
	int times = 3;

	get_token();
	initscr();
	start_color();
	init_pair(1, COLOR_BLACK, COLOR_RED);
    init_pair(2, COLOR_BLACK, COLOR_GREEN);
	init_pair(3, COLOR_BLACK, COLOR_WHITE);
	init_pair(4, COLOR_BLACK, COLOR_CYAN);
	init_pair(5, COLOR_BLACK, COLOR_BLACK);

	clear();
	noecho();
	cbreak();	/* Line buffering disabled. pass on everything */
	startx = 2;
	starty = 2;
		
	menu_win = newwin(HEIGHT, WIDTH, starty, startx);
	mvprintw(0, 5, "SAFEBOX KEYPAD");
	attron(COLOR_PAIR(4));
	mvprintw(1, 5, "Token: %s",TOKEN);
	attroff(COLOR_PAIR(4));
	keypad(menu_win, TRUE);
	refresh();
	print_menu(menu_win, highlight);
	while(1)
	{	
		if(!times) break;
		c = wgetch(menu_win);
		switch(c)
		{	case KEY_UP:
				if(highlight >= 0 && highlight <= 3)
					highlight = highlight;
				else
					highlight-=4;
				break;
			case KEY_DOWN:
				if(highlight >= 12 && highlight <= 15)
					highlight = highlight;
				else
					highlight+=4;
				break;
			case KEY_LEFT:
				if(highlight != 0 && highlight != 4 && highlight != 8 && highlight != 12)
					highlight-=1;
				break;
			case KEY_RIGHT:
				if(highlight != 3 && highlight != 7 && highlight != 11 && highlight != 15)
					highlight+=1;
				break;
			case 0x20:
				if(n==6){
					memset(KEY,'\0',10);
					memset(KEY_HEX,'\0',10);
					n = 0;
					attron(COLOR_PAIR(5));
					mvprintw(3, 30, "         ");
					attroff(COLOR_PAIR(5));
				}
				choice = highlight;
				KEY[n] = values[choice][0];
				KEY_HEX[n] = choices[choice][0];
				n++;
				if(n == 6){
					if(do_check(KEY,TOKEN))
					{
						attron(COLOR_PAIR(2));
						mvprintw(3, 40, "CORRECT");
						
						
						char* SECRET = READFILE("secret.txt");

						mvprintw(5, 30, "+---------------------------------+");
						mvprintw(6, 30, "|%30s   |",SECRET);
						mvprintw(7, 30, "+---------------------------------+");
						
						attroff(COLOR_PAIR(2));
					} else {
						
						attron(COLOR_PAIR(1));
						mvprintw(3, 30, "FAILED :(");
						attroff(COLOR_PAIR(1));
						times--;
						break;
					}
					
				}
				attron(COLOR_PAIR(3));
				mvprintw(13, 3, "You've pressed [%s]",choices[choice]);
				attroff(COLOR_PAIR(3));
				break;
			default:
				
				break;
		}
		
		refresh();
		print_menu(menu_win, highlight);

	}	
	
	for(int x = 0 ; x < 500; x++){
		attron(COLOR_PAIR(1));
		int tmp1 = rand()%50;
		int tmp2 = rand()%50;
		mvprintw(tmp1,tmp2,   "*--------------------------------*");
		mvprintw(tmp1+1,tmp2, "* SELF DESTRUCT SEQUENCE ENGAGED *");
		mvprintw(tmp1+2,tmp2, "*--------------------------------*");
		attroff(COLOR_PAIR(1));
		refresh();
		usleep(10000);
	}
	
	clrtoeol();
	refresh();
	wgetch(menu_win);
	endwin();
	return 0;
}


void print_menu(WINDOW *menu_win, int highlight)
{
	int x, y, i;	

	x = 3;
	y = 3;
	box(menu_win, 0, 0);
	wattron(menu_win, A_REVERSE); 
	mvwprintw(menu_win,1,8,"%06s",KEY_HEX);
	wattroff(menu_win, A_REVERSE);
	for(i = 0; i < 16 ; i+=4){
		mvwprintw(menu_win, y, x, "[%s] ", choices[i]);
		mvwprintw(menu_win, y, x+4, "[%s] ", choices[i+1]);
		mvwprintw(menu_win, y, x+8, "[%s] ", choices[i+2]);
		mvwprintw(menu_win, y, x+12, "[%s] ", choices[i+3]);
		if(highlight >= (i) && highlight <= (i+3)){
			wattron(menu_win, A_REVERSE); 
			mvwprintw(menu_win, y, x+((highlight%4))*4, "[%s]", choices[highlight]);
			wattroff(menu_win, A_REVERSE);
		}
		y++;
	}

	wrefresh(menu_win);
}