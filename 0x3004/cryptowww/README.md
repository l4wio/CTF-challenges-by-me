# cryptowww

## Overview

Hash extension, everyone can see it. But there are filtering, we can not simply put some invalid characters like `%80` %00` etc. to extend the plaintext.

https://github.com/l4wio/CTF-challenges-by-me/blob/master/0x3004/cryptowww/index.php#L6-L7

But...take a look at how does it work. It sends the params to `api.php` behind afterwards.

And `$_GET['HASH']` doesn't get filterd...

## Bug
We can put `&` (`%26` in urlencoded) after `HASH`, and when come through `file_get_contents` to `api.php`, it will overwrite `username`, `password` parameter eventually.

## Solution

https://github.com/l4wio/CTF-challenges-by-me/blob/master/0x3004/cryptowww/index.php#L12
