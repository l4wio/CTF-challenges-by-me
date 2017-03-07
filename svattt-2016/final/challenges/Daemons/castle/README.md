# castle

## Author
l4w
## Level
Hard
## Description
```
Install emoji on <a href='apt://ttf-ancient-fonts'>ubuntu</a> if you want.

nc x.x.x.x 31330
<a href='#'>Binary</a>
<a href='#'>libc.so</a>

Ubuntu 14.04.5 LTS
Linux ubuntu 4.4.0-31-generic #50~14.04.1-Ubuntu SMP Wed Jul 13 01:07:32 UTC 2016 x86_64 x86_64 x86_64 GNU/Linux

```
## Hints

## Solution
[exploit.py](exploit.py) <- Dùng để bruteforce cipher

[exploit2.py](exploit2.py) <- Exploit full-chain (based on libc)

## Note
###Installation
Tạo folder, bỏ 2 file [castle](castle) + intro.txt + intro2.txt và setup.sh chung (nho xoa sau khi cat dat xong), chmod +x rồi run [setup.sh](setup.sh) dưới quyền root. xóa đi khi cài đặt xong.


