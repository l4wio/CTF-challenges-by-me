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
	HTML = """<html><title>Prison Break</title><style>body{background:#000;}</style><body>
		<form action="./go" method=POST>
			<pre>       
<font color=Gray>                                                                                                                                                                                        
                                                                                                        ]]]]]]]]                                                                                       
                                         [[[[                                                           ]()()()]                                                                    ]]]]]]]]           
                                        [()()[                                                          ]()()()]                                                                    ]()()()]           
                                         [[[[                                                           ]()()()]                                                                    ]()()()]           
                                                                                                         ]()()[]                                                                    ]()()()]           
ppppp   ppppppppp   00000   000000000  [[[[[[[     ]]]]]]]]]]      ooooooooooo   [[[[  [[[[[[[[          ]()()[]]]]]]]]]    00000   000000000       [[[[[[[[[[[[    aaaaaaaaaaaaa    ]()()[]    ]]]]]]]
p()()ppp()()()()[p  0()()000()()()()[0 [()()[[   ]]()()()()()]   oo()()()()()[oo [()[[[()()()()[[        ]()()()()()()()]]  0()()000()()()()[0    [[()()()()()()[[  a()()()()()()a   ]()()[]   ]()()[] 
p()()()()()()()()[p 0()()()()()()()()[0 [()()[ ]]()()()()()()[] o()()()()()()()[o[()()()()()()()[[       ]()()()()()()()()] 0()()()()()()()()[0  [()()()[[[[[()()[[[aaaaaaaaa()()[a  ]()()[]  ]()()[]  
pp()()()ppppp()()()p00()()()00000()()()0[()()[ ]()()()]]]]()()[]o()()[ooooo()()[o[[()()()()()()()[[      ]()()[]]]]]()()()[]00()()()00000()()()0[()()()[     [()()[[         a()()a  ]()()[] ]()()[]   
 p()()[p     p()()[p 0()()[0     0()()[0[()()[  ]()()[]  ]]]]]] o()()o     o()()o  [()()[[[[[()()[[      ]()()[]    ]()()()] 0()()[0     0()()[0[()()()[[[[[[()()()[  aaaaaaa()()[a  ]()()()]()()[]    
 p()()[p     p()()[p 0()()[0     0000000[()()[    ]()()()]      o()()o     o()()o  [()()[    [()()[      ]()()[]     ]()()[] 0()()[0     0000000[()()()()()()()()[[ aa()()()()()()a  ]()()()()()[]     
 p()()[p     p()()[p 0()()[0            [()()[       ]()()()]   o()()o     o()()o  [()()[    [()()[      ]()()[]     ]()()[] 0()()[0            [()()()[[[[[[[[[[[ a()()aaaa()()()a  ]()()()()()[]     
 p()()[p    p()()()p 0()()[0            [()()[ ]]]]]]   ]()()[] o()()o     o()()o  [()()[    [()()[      ]()()[]     ]()()[] 0()()[0            [()()()[[         a()()a    a()()[a  ]()()()]()()[]    
 p()()[ppppp()()()[p 0()()[0           [()()()[]()()[]]]]()()()]o()()[ooooo()()[o  [()()[    [()()[      ]()()[]]]]]]()()()] 0()()[0            [()()()()[        a()()a    a()()[a ]()()()] ]()()[]   
 p()()()()()()()()p  0()()[0           [()()()[]()()()()()()()] o()()()()()()()[o  [()()[    [()()[      ]()()()()()()()()]  0()()[0             [()()()()[[[[[[[[a()()[aaaa()()()a ]()()()]  ]()()[]  
 p()()()()()()()pp   0()()[0           [()()()[ ]()()()()()[]]   oo()()()()()[oo   [()()[    [()()[      ]()()()()()()()[]   0()()[0              [[()()()()()()[[ a()()()()()aa()[a]()()()]   ]()()[] 
 p()()()pppppppp     0000000           [[[[[[[[  ]]]]]]]]]]]       ooooooooooo     [[[[[[    [[[[[[      ]]]]]]]]]]]]]]]]    0000000                [[[[[[[[[[[[[[  aaaaaaaaaa  aaaa]]]]]]]]    ]]]]]]]
 p()()[p                                                                                                                                                                                               
 p()()[p                                                                                                                                                                                               
p()()()[p                                                                                                                                                                                              
p()()()[p                                                                                                                                                                                              
p()()()[p                                                                                                                                                                                              
ppppppppp   
</font><font color=Red>
				from sys import modules
				modules.clear()
				del modules

				__builtins__.dir = None
				eval = None
				input = None
				execfile = None

				F_L_A_G = open('./flag','r').read()

				I_N_P_U_T = ( <input type=text name=code size=10 maxlength=50 /> ) # only a-z0-9[]() and length of code must be <= 50
				
				if I_N_P_U_T == list(F_L_A_G):
					print I_N_P_U_T
			</font></pre>
		</form>
	"""
	return HTML

@app.route('/go',methods=['POST'])
def go():
	code = request.form['code']

	import re
	code = re.sub(r'[^a-z0-9\[\]\(\)]','',code)[:50]

	python_code = "from sys import modules\nmodules.clear()\ndel modules\n\n__builtins__.dir = None\neval = None\nexecfile = None\ninput = None\n\nF_L_A_G = open('./flag','r').read()\nI_N_P_U_T = (%s)\nif I_N_P_U_T == list(F_L_A_G): print I_N_P_U_T" % code

	HTML = """<html><title>Prison Break</title><style>body{background:#000;}</style><body>
			<pre><font color=Gray>                                                                                                                                                                                        
                                                                                                        ]]]]]]]]                                                                                       
                                         [[[[                                                           ]()()()]                                                                    ]]]]]]]]           
                                        [()()[                                                          ]()()()]                                                                    ]()()()]           
                                         [[[[                                                           ]()()()]                                                                    ]()()()]           
                                                                                                         ]()()[]                                                                    ]()()()]           
ppppp   ppppppppp   00000   000000000  [[[[[[[     ]]]]]]]]]]      ooooooooooo   [[[[  [[[[[[[[          ]()()[]]]]]]]]]    00000   000000000       [[[[[[[[[[[[    aaaaaaaaaaaaa    ]()()[]    ]]]]]]]
p()()ppp()()()()[p  0()()000()()()()[0 [()()[[   ]]()()()()()]   oo()()()()()[oo [()[[[()()()()[[        ]()()()()()()()]]  0()()000()()()()[0    [[()()()()()()[[  a()()()()()()a   ]()()[]   ]()()[] 
p()()()()()()()()[p 0()()()()()()()()[0 [()()[ ]]()()()()()()[] o()()()()()()()[o[()()()()()()()[[       ]()()()()()()()()] 0()()()()()()()()[0  [()()()[[[[[()()[[[aaaaaaaaa()()[a  ]()()[]  ]()()[]  
pp()()()ppppp()()()p00()()()00000()()()0[()()[ ]()()()]]]]()()[]o()()[ooooo()()[o[[()()()()()()()[[      ]()()[]]]]]()()()[]00()()()00000()()()0[()()()[     [()()[[         a()()a  ]()()[] ]()()[]   
 p()()[p     p()()[p 0()()[0     0()()[0[()()[  ]()()[]  ]]]]]] o()()o     o()()o  [()()[[[[[()()[[      ]()()[]    ]()()()] 0()()[0     0()()[0[()()()[[[[[[()()()[  aaaaaaa()()[a  ]()()()]()()[]    
 p()()[p     p()()[p 0()()[0     0000000[()()[    ]()()()]      o()()o     o()()o  [()()[    [()()[      ]()()[]     ]()()[] 0()()[0     0000000[()()()()()()()()[[ aa()()()()()()a  ]()()()()()[]     
 p()()[p     p()()[p 0()()[0            [()()[       ]()()()]   o()()o     o()()o  [()()[    [()()[      ]()()[]     ]()()[] 0()()[0            [()()()[[[[[[[[[[[ a()()aaaa()()()a  ]()()()()()[]     
 p()()[p    p()()()p 0()()[0            [()()[ ]]]]]]   ]()()[] o()()o     o()()o  [()()[    [()()[      ]()()[]     ]()()[] 0()()[0            [()()()[[         a()()a    a()()[a  ]()()()]()()[]    
 p()()[ppppp()()()[p 0()()[0           [()()()[]()()[]]]]()()()]o()()[ooooo()()[o  [()()[    [()()[      ]()()[]]]]]]()()()] 0()()[0            [()()()()[        a()()a    a()()[a ]()()()] ]()()[]   
 p()()()()()()()()p  0()()[0           [()()()[]()()()()()()()] o()()()()()()()[o  [()()[    [()()[      ]()()()()()()()()]  0()()[0             [()()()()[[[[[[[[a()()[aaaa()()()a ]()()()]  ]()()[]  
 p()()()()()()()pp   0()()[0           [()()()[ ]()()()()()[]]   oo()()()()()[oo   [()()[    [()()[      ]()()()()()()()[]   0()()[0              [[()()()()()()[[ a()()()()()aa()[a]()()()]   ]()()[] 
 p()()()pppppppp     0000000           [[[[[[[[  ]]]]]]]]]]]       ooooooooooo     [[[[[[    [[[[[[      ]]]]]]]]]]]]]]]]    0000000                [[[[[[[[[[[[[[  aaaaaaaaaa  aaaa]]]]]]]]    ]]]]]]]
 p()()[p                                                                                                                                                                                               
 p()()[p                                                                                                                                                                                               
p()()()[p                                                                                                                                                                                              
p()()()[p                                                                                                                                                                                              
p()()()[p                                                                                                                                                                                              
ppppppppp   
</font><font color=Red>
				from sys import modules
				modules.clear()
				del modules

				__builtins__.dir = None
				eval = None
				input = None
				execfile = None

				F_L_A_G = open('./flag','r').read()

				I_N_P_U_T = ( <strong style='color:Green;'>%s</strong> ) # only a-z0-9[]() and length of code must be <= 50
				
				if I_N_P_U_T == list(F_L_A_G):
					print I_N_P_U_T""" % code

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


	HTML += "\n\t\t\t\t-----------------------------------\n\t\t\t\t<strong style='color:White;'>%s</strong>\n</pre>" % result
	return HTML

if __name__ == "__main__":
	if(sys.argv[1]=='test'):
		app.run(host='0.0.0.0',port=4000,debug=True)
	else:
		PORT = 40002
		print '------------------------'
		print 'Running on port',int(PORT)
		WSGIServer(app, multithreaded=True,bindAddress=('0.0.0.0',int(PORT))).run()