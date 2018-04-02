binary := house_of_c4rd
source_file := hoc.c
debug: $(source_file)
	clang -g -fPIE -pie -fstack-protector-all -lcrypto $(source_file) -o $(binary)
	# strip -s $(binary)
	# strip -g -S -d $(binary)
	# strip -x $(binary)
	# strip -X $(binary)
release: $(source_file)
	clang -fPIE -pie -fstack-protector-all -lcrypto $(source_file) -o $(binary)
	strip -s $(binary)
	strip -g -S -d $(binary)
	strip -x $(binary)
	strip -X $(binary)
clean:
	rm $(binary);
