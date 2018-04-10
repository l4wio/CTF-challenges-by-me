
# Luckygame
## Web / SQLi / PHP trick

### Point

Have you wonder how could you can sqli with table/column name filtering ? 

Also there are limited characters.

How about session variable, and leverage it on multi queries ?

Plus, PHP is weird, on comparing integers...

Only 100 lines of code PHP, everything was setup in logical way (especially, check bet money > 0) 

---

Flag is: flag{md5(password of admin)}

http://123.207.38.111/luckygame/?debug=🕵

http://123.207.38.111/luckygame/?debug=1

```
root@:~# cat /etc/issue
Ubuntu 16.04.1 LTS \n \l
root@:~# php -v
PHP 7.0.22-0ubuntu0.16.04.1 (cli) ( NTS )
Copyright (c) 1997-2017 The PHP Group
Zend Engine v3.0.0, Copyright (c) 1998-2017 Zend Technologies
   with Zend OPcache v7.0.22-0ubuntu0.16.04.1, Copyright (c) 1999-2017, by Zend Technologies
root@:~# mysql --version
mysql  Ver 14.14 Distrib 5.7.19, for Linux (x86_64) using  EditLine wrapper
```
### Writeup
https://github.com/l4wio/CTF-challenges-by-me/blob/master/0ctf_final-2017/0ctf_slides.pdf

https://www.bertramc.cn/2017/06/08/32.html

https://www.melodia.pw/?p=902

http://www.bendawang.site/2017/06/19/0CTF-TCTF-2017-final-Web-LuckyGame-Writeup/

https://phuker.github.io/tctf2017-final-web.html
