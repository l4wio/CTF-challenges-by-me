from sys import modules
modules.clear()
del modules

__builtins__.dir = None
eval = None
input = None
execfile = None

LEN_PASS = 32 # Length of Password is 32

I_N_P_U_T = ( [(i)for(i)in[chr(53)]for(vars()[list(vars())[0]])in[0]] ) # only a-z0-9[]() and length of code must be <= 50

P_A_S_S_W_O_R_D = open('./password','r').read()

for i in range(LEN_PASS+1):
	if I_N_P_U_T[i] != P_A_S_S_W_O_R_D[i]:
		from sys import exit
		exit('Wrong')

# FLAGGGGGGGGGGGGGGGGGGGGGGGG
print 'Here is your flag:',open('./flag','r').read()

