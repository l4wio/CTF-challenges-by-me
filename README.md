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
I'm going to describe my highlight challenges, which I like mostly. Also point out the interesting points of them.

## Web
Name | Programing language | Type | Rating | Level
--- | --- | --- | --- | --- |
[prisonbreakseason2](#prisonbreakseason2) | Python | Python Jail | ⭐⭐⭐⭐ | 💀💀💀
[XYZBANK](#XYZBANK) | PHP | MySQL type casting | ⭐⭐ | 💀💀 
[XYZTemplate](#XYZTemplate) | PHP/Javascript | Javascript/XSS | ⭐⭐ | 💀💀 
[cryptowww](#cryptowww) | PHP | Hash extension / urldecode trick | ⭐⭐ | 💀💀 
[curl_story_part_1](#curl_story_part_1) | PHP | SSRF /w CRLF Injection (it was 0day)  | ⭐⭐⭐⭐ | 💀💀
[dota2shop](#dota2shop) | PHP | MySQLi /w session variable | ⭐⭐⭐ | 💀💀
[luckygame](#luckygame) | PHP | MySQLi /w session variable | ⭐⭐⭐⭐ | 💀💀💀
[simplehttp](#simplehttp) | Ruby | Ruby RCE /w `WEBrick::Log.new` | ⭐⭐⭐⭐ | 💀💀💀
[tower4](#tower4) | Python | Format injection | ⭐⭐⭐⭐ | 💀💀
[lixi](lixi_2018) | PHP | PHP syntax trick | ⭐⭐⭐ | 💀💀
[LoginMe](0ctf_quals-2018/LoginMe) | NodeJS | RegExp injection | ⭐⭐⭐ | 💀
[h4x0rs.club](0ctf_quals-2018/h4x0rs.club) | PHP/JS | CSP, XSS, iframe in the middle, postMessage to `top` | ⭐⭐⭐⭐ | 💀💀💀
[h4x0rs.space](0ctf_quals-2018/h4x0rs.space) | PHP/JS | CSP, XSS, AppCache, ServiceWorker | ⭐⭐⭐⭐ | 💀💀💀


## Pwnable 
Name | Type | Rating | Level
--- | --- | --- | --- |
[anotherarena](#anotherarena) | Heap on another `main_arena` (threads) | ⭐⭐⭐ | 💀
[c0ffee](#c0ffee) | Race condition, with 1-byte overwrite, nearly impossible to exploit | ⭐⭐⭐⭐ | 💀💀💀
[pokedex](#pokedex) | Uninitialized memory | ⭐⭐⭐ | 💀💀
[rapgenius](#rapgenius) | Heap overflow, `FILE *IO` abusing | ⭐⭐⭐ | 💀💀
[castle](#castle) | Combine many of bugs: uninitliazed memory + stack overflow + heap overflow to defeat stack cookie eventually  | ⭐⭐⭐⭐ | 💀💀💀
[House-of-Cards](#0ctf_quals-2018/House-of-Cards) | Old school pwnable /w interesting idea | ⭐⭐⭐⭐ | 💀💀



---
I'm gonna tell the details below...
..updating

### prisonbreakseason2
Do you know that you can assign variable in a Python loop ? 

Escaping pyjail with limited characters.

Writeup here: http://gynvael.coldwind.pl/n/python_sandbox_escape

---
### XYZBANK

---
### XYZTemplate
