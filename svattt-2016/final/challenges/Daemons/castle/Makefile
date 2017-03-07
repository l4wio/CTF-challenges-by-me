castle: crypto.c main.c
	clang main.c crypto.c -o castle -m32 -fstack-protector && strip castle
release:
	clang main.c crypto.c -o castle -m32 -fstack-protector && strip castle