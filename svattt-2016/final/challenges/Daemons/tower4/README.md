# Tower 4

## Overview

Goal is logging as `admin`.

## Bug

There is no SQLi here.

Take a a look at:
https://github.com/l4wio/CTF-challenges-by-me/blob/master/svattt-2016/final/challenges/Daemons/tower4/tower4.py#L223-L229

You can see that, it's trying to `.format` twice

1st time:
```
INSERT INTO users VALUES ('{u1}','{qa1}','{p1}','{e1}'),
```
After 1st format-ed:
```
INSERT INTO users VALUES ('abcdef','aaa','...random password...','abc@def.com'),
```
2nd time:
```
INSERT INTO users VALUES ('abcdef','aaa','...random password...','abc@def.com'),('{u2}','{qa2}','{p2}','{e2}')
```
After 2nd format-ed:
```
INSERT INTO users VALUES ('abcdef','aaa','...random password...','abc@def.com'),('abcdef','aaa','...random password 2...','abc@def.com')
```

What if we let username as `{e2}`, and let `email` be `admin`

We can bypass the check if there is any of existence username already.

By setup like this, I turned this into sort of format/template injection.


## Solution
* https://github.com/testanull/CTF/blob/master/Tower%204.md

