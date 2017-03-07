# -*- coding: utf-8 -*-
from flask import Flask,request,make_response
from flup.server.fcgi import WSGIServer 
import subprocess
import os
import sys

app = Flask(__name__)
DIR = os.path.dirname(os.path.realpath(__file__))

@app.route('/')
def index():
	HTML = """<html><title>Prison Break s02</title><style>body{background:#000;}</style><body>
			<pre><font color=Gray size=1px>          
                                                                                                                                                                                                                                                       
                                                                                                  [[[[[[[[                                                                                                                                             
                                         ((((                                                     [[][][][                                                                    [[[[[[[[                               ]]]]]]]]]      222222222222222    
                                        ([][](                                                    [[][][][                                                                    [[][][][                             ]][][][][][]]   2[][][][][][][][22  
                                         ((((                                                     [[][][][                                                                    [[][][][                           ]][][][][][][][]] 2[][][]222222[][][2 
                                                                                                   [[][][[                                                                    [[][][][                          ][][][][]]][][][][]2222222     2[][][2 
ppppp   ppppppppp   ]]]]]   ]]]]]]]]]  (((((((     ))))))))))      ooooooooooo   1111  11111111    [[][][[[[[[[[[[    ]]]]]   ]]]]]]]]]       ))))))))))))    aaaaaaaaaaaaa    [[][][[    [[[[[[[  ))))))))))   ][][][]]   ][][][]]            2[][][2 
p[][]ppp[][][][][p  ][][]]]][][][][][] ([][][(   ))[][][][][])   oo[][][][][][oo 1[][11[][][][]11  [[][][][][][][][[  ][][]]]][][][][][]    ))[][][][][][]))  a[][][][][][]a   [[][][[   [[][][[ ))[][][][][])  ][][][]     ][][][]            2[][][2 
p[][][][][][][][][p ][][][][][][][][][] ([][]( ))[][][][][][][) o[][][][][][][][o1[][][][][][][]11 [[][][][][][][][][ ][][][][][][][][][]  )[][][])))))[][][))aaaaaaaaa[][][a  [[][][[  [[][][[))[][][][][][][) ][][][]     ][][][]         2222[][]2  
pp[][][]ppppp[][][]p]][][][]]]]]][][][]]([][]( )[][][]))))[][][)o[][][ooooo[][][o11[][][][][][][][1[[][][[[[[[[][][][[]][][][]]]]]][][][]])[][][])     )[][][)         a[][]a  [[][][[ [[][][[ )[][][]))))[][][)][][][] ]]] ][][][]    22222[][][]22   
 p[][][p     p[][][p ][][][]     ][][][]([][](  )[][][)  )))))) o[][]o     o[][]o  1[][][1111[][][1[[][][[    [[][][][ ][][][]     ][][][])[][][][)))))[][][])  aaaaaaa[][][a  [[][][][[][][[   )[][][)  )))))) ][][][] ]]] ][][][]  22[][][][]222     
 p[][][p     p[][][p ][][][]     ]]]]]]]([][](    )[][][])      o[][]o     o[][]o  1[][]1    1[][]1[[][][[     [[][][[ ][][][]     ]]]]]]])[][][][][][][][][) aa[][][][][][]a  [[][][][][][[      )[][][])      ][][][]     ][][][] 2[][][22222        
 p[][][p     p[][][p ][][][]            ([][](       )[][][])   o[][]o     o[][]o  1[][]1    1[][]1[[][][[     [[][][[ ][][][]            )[][][]))))))))))) a[][]aaaa[][][]a  [[][][][][][[         )[][][])   ][][][]     ][][][]2[][][2             
 p[][][p    p[][][]p ][][][]            ([][]( ))))))   )[][][) o[][]o     o[][]o  1[][]1    1[][]1[[][][[     [[][][[ ][][][]            )[][][][)         a[][]a    a[][][a  [[][][][[][][[  ))))))   )[][][) ][][][]]   ][][][]]2[][][2             
 p[][][ppppp[][][][p ][][][]           ([][][]()[][][))))[][][])o[][][ooooo[][][o  1[][]1    1[][]1[[][][[[[[[[[][][][ ][][][]            )[][][][])        a[][]a    a[][][a [[][][][ [[][][[ )[][][))))[][][])][][][][]]][][][][]2[][][2       222222
 p[][][][][][][][]p  ][][][]           ([][][]()[][][][][][][]) o[][][][][][][][o  1[][]1    1[][]1[[][][][][][][][][  ][][][]             )[][][][]))))))))a[][][aaaa[][][]a [[][][][  [[][][[)[][][][][][][])  ]][][][][][][][]] 2[][][]2222222[][][2
 p[][][][][][][]pp   ][][][]           ([][][]( )[][][][][][))   oo[][][][][][oo   1[][]1    1[][]1[[][][][][][][][[   ][][][]              ))[][][][][][][) a[][][][][]aa[][a[[][][][   [[][][[)[][][][][][))     ]][][][][][]]   2[][][][][][][][][]2
 p[][][]pppppppp     ]]]]]]]           ((((((((  )))))))))))       ooooooooooo     111111    111111[[[[[[[[[[[[[[[[    ]]]]]]]                ))))))))))))))  aaaaaaaaaa  aaaa[[[[[[[[    [[[[[[[)))))))))))         ]]]]]]]]]     22222222222222222222
 p[][][p                                                                                                                                                                                                                                               
 p[][][p                                                                                                                                                                                                                                               
p[][][][p                                                                                                                                                                                                                                              
p[][][][p                                                                                                                                                                                                                                              
p[][][][p                                                                                                                                                                                                                                              
ppppppppp                                                                                                                                                                                                                                              


</font><font color=Red><form action="./go" method=POST><pre>
				from sys import modules
				modules.clear()
				del modules

				__builtins__.dir = None
				eval = None
				input = None
				execfile = None

				LEN_PASS = len(open('./password','r').read()) # Length of Password
				
				I_N_P_U_T = ( <input type=text name=code size=10 maxlength=50 /> ) # only a-z0-9[]() and length of code must be <= 50
				
				P_A_S_S_W_O_R_D = open('./password','r').read()

				assert LEN_PASS >= 1
				assert LEN_PASS == len(I_N_P_U_T)
				for i in range(LEN_PASS):
					if I_N_P_U_T[i] != P_A_S_S_W_O_R_D[i]:
						from sys import exit
						exit() # Wrong

				# FLAGGGGGGGGGGGGGGGGGGGGGGGG
				print 'Here is your flag:',open('./flag','r').read()
			</pre>
		</form></html>
	"""
	return HTML

@app.route('/go',methods=['POST'])
def go():
	code = request.form['code']

	import re
	code = re.sub(r'[^a-z0-9\[\]\(\)]','',code)[:50]

	python_code = "from sys import modules\nmodules.clear()\ndel modules\n\n__builtins__.dir = None\neval = None\ninput = None\nexecfile = None\n\nLEN_PASS = len(open('./password','r').read())\t\t\nI_N_P_U_T = ( %s )\t\t\nP_A_S_S_W_O_R_D = open('./password','r').read()\nassert LEN_PASS >= 1\nassert LEN_PASS == len(I_N_P_U_T)\nfor i in range(LEN_PASS):\n\tif I_N_P_U_T[i] != P_A_S_S_W_O_R_D[i]:\n\t\tfrom sys import exit\n\t\texit()\n\n\n# FLAGGGGGGGGGGGGGGGGGGGGGGGG\nprint 'Here is your flag:',open('./flag','r').read()" % code

	HTML = """<html><title>Prison Break s02</title><style>body{background:#000;}</style><body>
			<pre><font color=Gray size=1px>          
                                                                                                                                                                                                                                                       
                                                                                                  [[[[[[[[                                                                                                                                             
                                         ((((                                                     [[][][][                                                                    [[[[[[[[                               ]]]]]]]]]      222222222222222    
                                        ([][](                                                    [[][][][                                                                    [[][][][                             ]][][][][][]]   2[][][][][][][][22  
                                         ((((                                                     [[][][][                                                                    [[][][][                           ]][][][][][][][]] 2[][][]222222[][][2 
                                                                                                   [[][][[                                                                    [[][][][                          ][][][][]]][][][][]2222222     2[][][2 
ppppp   ppppppppp   ]]]]]   ]]]]]]]]]  (((((((     ))))))))))      ooooooooooo   1111  11111111    [[][][[[[[[[[[[    ]]]]]   ]]]]]]]]]       ))))))))))))    aaaaaaaaaaaaa    [[][][[    [[[[[[[  ))))))))))   ][][][]]   ][][][]]            2[][][2 
p[][]ppp[][][][][p  ][][]]]][][][][][] ([][][(   ))[][][][][])   oo[][][][][][oo 1[][11[][][][]11  [[][][][][][][][[  ][][]]]][][][][][]    ))[][][][][][]))  a[][][][][][]a   [[][][[   [[][][[ ))[][][][][])  ][][][]     ][][][]            2[][][2 
p[][][][][][][][][p ][][][][][][][][][] ([][]( ))[][][][][][][) o[][][][][][][][o1[][][][][][][]11 [[][][][][][][][][ ][][][][][][][][][]  )[][][])))))[][][))aaaaaaaaa[][][a  [[][][[  [[][][[))[][][][][][][) ][][][]     ][][][]         2222[][]2  
pp[][][]ppppp[][][]p]][][][]]]]]][][][]]([][]( )[][][]))))[][][)o[][][ooooo[][][o11[][][][][][][][1[[][][[[[[[[][][][[]][][][]]]]]][][][]])[][][])     )[][][)         a[][]a  [[][][[ [[][][[ )[][][]))))[][][)][][][] ]]] ][][][]    22222[][][]22   
 p[][][p     p[][][p ][][][]     ][][][]([][](  )[][][)  )))))) o[][]o     o[][]o  1[][][1111[][][1[[][][[    [[][][][ ][][][]     ][][][])[][][][)))))[][][])  aaaaaaa[][][a  [[][][][[][][[   )[][][)  )))))) ][][][] ]]] ][][][]  22[][][][]222     
 p[][][p     p[][][p ][][][]     ]]]]]]]([][](    )[][][])      o[][]o     o[][]o  1[][]1    1[][]1[[][][[     [[][][[ ][][][]     ]]]]]]])[][][][][][][][][) aa[][][][][][]a  [[][][][][][[      )[][][])      ][][][]     ][][][] 2[][][22222        
 p[][][p     p[][][p ][][][]            ([][](       )[][][])   o[][]o     o[][]o  1[][]1    1[][]1[[][][[     [[][][[ ][][][]            )[][][]))))))))))) a[][]aaaa[][][]a  [[][][][][][[         )[][][])   ][][][]     ][][][]2[][][2             
 p[][][p    p[][][]p ][][][]            ([][]( ))))))   )[][][) o[][]o     o[][]o  1[][]1    1[][]1[[][][[     [[][][[ ][][][]            )[][][][)         a[][]a    a[][][a  [[][][][[][][[  ))))))   )[][][) ][][][]]   ][][][]]2[][][2             
 p[][][ppppp[][][][p ][][][]           ([][][]()[][][))))[][][])o[][][ooooo[][][o  1[][]1    1[][]1[[][][[[[[[[[][][][ ][][][]            )[][][][])        a[][]a    a[][][a [[][][][ [[][][[ )[][][))))[][][])][][][][]]][][][][]2[][][2       222222
 p[][][][][][][][]p  ][][][]           ([][][]()[][][][][][][]) o[][][][][][][][o  1[][]1    1[][]1[[][][][][][][][][  ][][][]             )[][][][]))))))))a[][][aaaa[][][]a [[][][][  [[][][[)[][][][][][][])  ]][][][][][][][]] 2[][][]2222222[][][2
 p[][][][][][][]pp   ][][][]           ([][][]( )[][][][][][))   oo[][][][][][oo   1[][]1    1[][]1[[][][][][][][][[   ][][][]              ))[][][][][][][) a[][][][][]aa[][a[[][][][   [[][][[)[][][][][][))     ]][][][][][]]   2[][][][][][][][][]2
 p[][][]pppppppp     ]]]]]]]           ((((((((  )))))))))))       ooooooooooo     111111    111111[[[[[[[[[[[[[[[[    ]]]]]]]                ))))))))))))))  aaaaaaaaaa  aaaa[[[[[[[[    [[[[[[[)))))))))))         ]]]]]]]]]     22222222222222222222
 p[][][p                                                                                                                                                                                                                                               
 p[][][p                                                                                                                                                                                                                                               
p[][][][p                                                                                                                                                                                                                                              
p[][][][p                                                                                                                                                                                                                                              
p[][][][p                                                                                                                                                                                                                                              
ppppppppp                                                                                                                                                                                                                                              


</font><font color=Red><pre>
				from sys import modules
				modules.clear()
				del modules

				__builtins__.dir = None
				eval = None
				input = None
				execfile = None

				LEN_PASS = len(open('./password','r').read()) # Length of Password
				
				I_N_P_U_T = ( <strong style='color:Green;'>%s</strong> ) # only a-z0-9[]() and length of code must be <= 50
				
				P_A_S_S_W_O_R_D = open('./password','r').read()

				assert LEN_PASS >= 1
				assert LEN_PASS == len(I_N_P_U_T)
				for i in range(LEN_PASS):
					if I_N_P_U_T[i] != P_A_S_S_W_O_R_D[i]:
						from sys import exit
						exit()

				# FLAGGGGGGGGGGGGGGGGGGGGGGGG
				print 'Here is your flag:',open('./flag','r').read()
				-----------------------------------------------------
				""" % code

	from os import urandom
	random_filename = '/tmp/'+urandom(10).encode('hex')
	f = open(random_filename,'w')
	f.write(python_code)
	f.close()

	f = open('log/code','a')
	f.write(request.remote_addr+"\n"+code+"\r\n-------------\r\n")
	f.close()


	result = subprocess.Popen('python %s' % (random_filename),shell=True,stdout=subprocess.PIPE).communicate()[0]

	os.remove(random_filename)


	HTML += "\n\t\t\t\t<strong style='color:White;'>%s</strong>\n</pre></html>" % result
	return HTML

if __name__ == "__main__":
	if(sys.argv[1]=='test'):
		app.run(host='0.0.0.0',port=35678,debug=True)
	else:
		PORT = 40006
		print '------------------------'
		print 'Running on port',int(PORT)
		WSGIServer(app, multithreaded=True,bindAddress=('0.0.0.0',int(PORT))).run()
