# admincp

## Author
l4w
## Level
Medium
## Description

nc x.x.x.x 31333

nc y.y.y.y 31333

Give me PoC
```
import json
from Crypto.Cipher import AES

IV = XXXXXXX_CENSORED_XXXXXXX
KEY = XXXXXXX_CENSORED_XXXXXXX
FLAG = XXXXXXX_CENSORED_XXXXXXX

cipher = raw_input("Enter your the credential: ")
login = json.loads(AES.new(KEY, AES.MODE_OFB, IV).decrypt(cipher.decode('hex')))
if login['user'] == 'admin':
    print 'Here is your reward:',FLAG
```

## Hints

## Solution
[solution.py](solution.py)
## Note
###Installation
bỏ file server.py và setup.sh chung folder (nhớ xóa khi setup xong)

chmod và run [setup.sh](setup.sh)

bài này cần brute, khuyến khích nên setup 2 server.

## Flag
SVATTT{sorry_this_aint_totally_cryptography_using_crypto_w1sely_btw}

