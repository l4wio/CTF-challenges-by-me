# simplehttp

### Description
```
Why do I have to use Apache/Nginx when I can build <a href='http://x.x.x.x:31332/guest/'>it</a> myself with less than 60 lines of code.
<a href='#'>main.rb</a>
```
### Solution
[exploit.py](exploit.py)

### Flag
SVATTT{lul_ruby_is_very_weird}

### Overview

This one is published on ~ Nov.2016

You probably can't see any obvious bugs right there, dig more you will see. there's something weird with `WEBrick::Log.new`

Take a look at: https://github.com/nahi/webrick/blob/master/lib/webrick/log.rb#L34

`WEBrick::Log.new` invokes `open` eventually. and its param is controllable by attackers.

https://apidock.com/ruby/Kernel/open

```
If the command following the “|” is a single minus sign, Ruby forks, and this subprocess is connected to the parent. In the subprocess, the open call returns nil.
```

Turns into RCE.
