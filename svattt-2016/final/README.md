# SVATTT2016

### Vòng chung kết
- Hình thức: on-site attack/defense
- Thời gian: 02/12/2016 tại KS Grand Plaza
- Thể lệ: https://docs.google.com/document/d/1kTAT0hfwKWaYhnkqy0Rg2FbbyHZZr8Tv2gET477sXEM/edit

## Serverlist

`camp1` và `camp2` có thể setup nhiều challenges trên đó.

Name | Type | IP | Port service
--- | --- | --- | ---
castle | Daemons | 128.199.141.114 | 31330 
tower1 | Daemons | 139.59.227.253  | 31331
tower2 | Daemons | 139.59.227.254  | 5002
tower3 | Daemons | 139.59.227.255  | 31333
tower4 | Daemons | 139.59.235.0    | 5004
--- | --- | --- | ---
neutralcamp2 | NeutralCamp | 139.59.235.1 | 40002
neutralcamp4 | NeutralCamp | 139.59.235.1 | 40004
camp2 | None | 139.59.235.2 | None
--- | --- | --- | ---
scorebot | bot | 128.199.95.110 | 9988,5000



##TODO
- Ra challenges (10 bài?), trong đó có 3 bài attack/defense ở các căn cứ.
- Làm scoreboard cho hình thức A/D (mua/xài vũ khí, blah blah).
- Scorebot kiểm tra các cơ chế game (owner của các căn cứ, check vá/sửa hợp lệ,...)
- Iptables limit connection.

## Challenges 
Update tree ở dưới với format:

**Name|Category|Level|Author**

Sẽ không dùng score, mà mình dùng level để đánh giá, sau đó sẽ có người review lại đề và cho ra thang điểm sau (có cho số điểm tượng trưng cho mọi người dễ hình dung):
* Easy (~ 50-100 points)
* Medium (~ 101-200 points)
* Hard (~ 201-300 points)
* Expert (~ >300 points)

Flag format: SVATTT{hash / base64}

Sau đó push source code/material/description/hints (nếu có).

```
challenges/
|
|___ Daemons
|     |_________ Castle|rev/crypto/pwn|Hard|l4w = 220 gold
|     |_________ Tower 1|rev/crypto|medium|l4w = 140 gold
|     |_________ Tower 2|web|easy|l4w = 100 gold
|     |_________ Tower 3|pwn|easy|l4w = 120 gold
|     |_________ Tower 4|web|medium|l4w = 180 gold
|   
|___ Neutral Creeps
      |_________ Neutral camp 1|web|TBD|g4mm4
      |_________ Neutral camp 2|easy|shellcode(misc)|l4w
      |_________ Neutral camp 3|easy|reverse|l4w      
      |_________ Neutral camp 6|hard|pwn|xboy      
      |_________ ...TBD


```
