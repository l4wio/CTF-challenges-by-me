# House of Cards


```
nc 104.236.0.107 11111
nc 202.120.7.193 11111

————————————————————————————————————————————————————————————
    🃏   🄷 🄾 🅄 🅂 🄴  🄾 🄵  🄲 🄰 🅁 🄳 🅂   🃏
————————————————————————————————————————————————————————————
1♠ Write
2♥ Read
3♦ Go
4♣ Exit
>
```

You can checkout [angelboy's](https://github.com/scwuaptx/CTF/tree/master/2018-writeup/0ctf/houseofcard) neat exploit code.

It's not about heap at all. 

You have to exploit with 2 IP.

IP A to leak the whole stack to file `l4w` by supplying `Size data` = `-1` . Hang it.

Meanwhile, go to IP B, using stack overflow, to spray the string like: 

`'/////////{ip_A}\0' * 0x1337`

to overwrite env `REMOTE_HOST`

On the current session B, you got the sandbox path as IP A directory. From now on, you can read the leaked-stack file `l4w`, then send it to A.

Go back to A, parse the file then you have full stack content including: stack cookie, return address, PIE , libc ... and simply overwrite return address to `system`.

## Flag
```
flag{b4ck_t0_the_0ldsch0ol}
When you glambe, you dont play on cards, you play on man.
```
