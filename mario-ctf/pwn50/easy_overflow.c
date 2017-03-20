/* stack1.c                                     *
 * specially crafted to feed your brain by gera */
#include <stdio.h>
int main() {
        int cookie = 0x1337;
        char buf[8];
        printf("buf: %08x cookie: %08x\n", &buf, &cookie);
	fflush(stdout);        
	fgets(buf,13,stdin);
	fflush(stdout);
        printf("cookie value: %.8x\n",cookie);
        if (cookie == 0x41424344)
                printf("HERE IS YOUR FLAG: xxxxxxxxxxxxxxxxxxxxxxxxx\n");
}
 //xxxxxxxxxxxxxxxxxxxxxxxxxxxx is censored, it is not real-flag, you must pwn on remote host to get real-flag :)


