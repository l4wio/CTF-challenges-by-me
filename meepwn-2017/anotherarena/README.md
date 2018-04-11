# anotherarena

## Overview

When I was playing on some tasks, I notice that

Calling dynamic allocation `malloc` (etc.) on threads, another `main_arena` will be spawned, and placed on the thread's heap itself.

I've setup this challenge as the following:
1. Recieve some serial key, there is int overflow.
2. Turns it into heap OOB write backward

## Bug
If these bugs were setup on main thread, it's probably impossible to exploit (even no leaking).
 
But since, `main_arena` is placed on same page. we can OOB write backward to overwrite `main_arena`, and make `fast_bin` allocates on `FLAG` buffer.

Team `eee` successfully exploit it with `dl-resolve` technique...

Funfact: Afterwards, angelboy decided to let pwngdb supports parsing heap on threads XD (https://github.com/scwuaptx/Pwngdb/commit/0fe4c04debff579a74ccb50dc76439e7938800a5)

## Writeup
https://bruce30262.github.io/2017/07/16/MeePwn-CTF-2017-anotherarena/

