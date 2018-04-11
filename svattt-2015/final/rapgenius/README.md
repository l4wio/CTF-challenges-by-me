# rapgenius

## Overview

This challenge is released on Nov.2015

When there is not many research on `FILE *IO` published yet.

## Bug

Uninitliazed value: https://github.com/l4wio/CTF-challenges-by-me/blob/master/svattt-2015/final/rapgenius/service.c#L203

To trigger, there is a little trick. We can enter the playlist name with long string. 

if `fopen` detects the path is too long, will return failed. So we can let `f` variable be an uninitliazed value. then leverage it to use-after-free.

Fake `FILE *IO` structure, then abuse `_IO_read*` and `_IO_write*` to get R/W primitive.

https://code.woboq.org/userspace/glibc/libio/bits/types/struct_FILE.h.html#_IO_FILE

## Solution
* https://github.com/l4wio/CTF-challenges-by-me/blob/master/svattt-2015/final/rapgenius/exploit.py
* https://github.com/l4wio/CTF-challenges-by-me/blob/master/svattt-2015/final/rapgenius/exploit2.py
