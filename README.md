# CTF-challenges-by-me

Repo này với mục đích lưu trữ lại những challenges do mình đã tạo ra trong các kì CTF (SVATTT|0x3004|...) cũng như những lần ngẫu hứng.

Mình đang tìm lại và sẽ update thêm các challenges khác.

✌

These are CTF-style challenges I've made. Hope you enjoyed.

Updated 21/03/2017


[Final round SVATTT 2016 Introduction page](https://l4wio.github.io/CTF-challenges-by-me/final.svattt.org/)

Twitter: @l4wio

...Dành cả tuổi thanh xuân để suy nghĩ đề CTF.

# Highlight

Tips: Like reading book, don't read the last pages first. Let's enjoy them for a day at least before checking writeup/sol. I've put a lot of my work in each one.

I'm going to describe my highlight challenges, which I like mostly. Also point out the interesting points of them.



## Web
Name | Language | Summary | Rating | Level | Describe yet ?
--- | --- | --- | --- | --- | --- |
[prisonbreakseason2](0x3004/150-prisonbreakseason2) | Python | Python Jail | ⭐⭐⭐⭐ | 💀💀💀 | ✔️
[XYZBANK](0x3004/200-XYZBANK) | PHP | MySQL type casting | ⭐⭐ | 💀💀 | ✔️
[XYZTemplate](0x3004/250-XYZTemplate) | PHP/Javascript | Javascript/XSS | ⭐⭐ | 💀💀 |
[cryptowww](0x3004/cryptowww) | PHP | Hash extension / urldecode trick, HTTP Parameter Pollution | ⭐⭐ | 💀💀 | ✔️
[curl_story_part_1](challs.manhluat.org/curl_story_part_1) | PHP | SSRF /w CRLF Injection (it was 0day)  | ⭐⭐⭐⭐ | 💀💀 | ✔️ 
[luckygame](0ctf_final-2017/luckygame) | PHP | MySQLi /w session variable + php type juggling | ⭐⭐⭐⭐ | 💀💀💀 | ✔️
[simplehttp](svattt-2016/quals/challenges/web/simplehttp) | Ruby | Ruby RCE /w `WEBrick::Log.new` | ⭐⭐⭐⭐ | 💀💀💀 | ✔️
[tower4](svattt-2016/final/challenges/Daemons/tower4) | Python | Format injection | ⭐⭐⭐⭐ | 💀💀 | ✔️
[lixi](lixi_2018) | PHP | PHP syntax trick | ⭐⭐⭐ | 💀💀 | ✔️
[LoginMe](0ctf_quals-2018/LoginMe) | NodeJS | RegExp injection, MongoDB | ⭐⭐⭐ | 💀 | ✔️
[h4x0rs.club](0ctf_quals-2018/h4x0rs.club) | PHP/JS | CSP `strict-dynamic`, XSS, iframe in the middle, postMessage to `top` | ⭐⭐⭐⭐ | 💀💀💀 | ✔️
[h4x0rs.space](0ctf_quals-2018/h4x0rs.space) | PHP/JS | CSP, Persistent XSS, AppCache, ServiceWorker | ⭐⭐⭐⭐ | 💀💀💀 | ✔️
[h4x0rs.date](0ctf_final-2018/0ctf_tctf_2018_slides.pdf) | PHP/JS | CSP, cache, `<meta>` Referrer override | ⭐⭐⭐ | 💀💀 | ✔️


## Pwnable 
Name | Summary | Rating | Level | Describe yet ?
--- | --- | --- | --- | --- |
[anotherarena](meepwn-2017/anotherarena) | Heap on another `main_arena` (threads) | ⭐⭐⭐ | 💀 | ✔️
[c0ffee](meepwn-2017/c0ffee) | Race condition, with 1-byte overwrite, nearly impossible to exploit | ⭐⭐⭐⭐ | 💀💀💀 |
[pokedex](svattt-2015/final/pokedex) | Uninitialized memory -> Heap overflow | ⭐⭐⭐ | 💀💀 | ✔️
[rapgenius](svattt-2015/final/rapgenius) | Uninitialized memory -> Use-After-Free + `_IO_FILE` abusing (`_IO_read_*` && `_IO_write_*`) | ⭐⭐⭐ | 💀💀 | ✔️
[castle](svattt-2016/final/challenges/Daemons/castle) | Combine many of bugs: uninitliazed memory + stack overflow + heap overflow to defeat stack cookie eventually  | ⭐⭐⭐⭐ | 💀💀💀 | 
[House-of-Cards](0ctf_quals-2018/House-of-Cards) | Old school pwnable, overwriting `ENV` | ⭐⭐⭐⭐ | 💀💀 | ✔️
[h4x0rs.club pt3](0ctf_final-2018/h4x0rs.club%20pt3) | Old school pwnable, Fake MySQL server, MySQL LOCAL INFILE | ⭐⭐⭐⭐⭐ | 💀💀💀 | ✔️


Updating...
