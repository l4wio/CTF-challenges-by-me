from optparse import OptionParser
import subprocess
import sys
import os

parser = OptionParser()
parser.add_option("-f", "--file", dest="filename",help="READ FILE", metavar="FILE")
parser.add_option("-s", "--source", dest="source",help="view source",default=False,action="store_true")
parser.add_option("-l", "--list", dest="list",help="LIST DIR",default=False,action="store_true")
(options, args) = parser.parse_args()

if options.source:
	print open(sys.argv[0]).read()
elif options.filename:
	print open(options.filename).read()
elif options.list:
	print os.listdir('./')
