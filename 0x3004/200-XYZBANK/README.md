# XYZBANK

## Overview

The idea came from: http://www.phenoelit.org/blog/archives/2013/02/05/mysql_madness_and_rails/index.html

So I've setup the challenge as the following:
1. Recieve credentials from cookie as `JSON`
2. Passed it into [the query](https://github.com/l4wio/CTF-challenges-by-me/blob/master/0x3004/200-XYZBANK/app.py#L38).


## Bug

Briefly,

```
mysql> SELECT 123 FROM dual WHERE 1="somestring";
Empty set, 1 warning (0.00 sec)

mysql> SELECT 123 FROM dual WHERE 0="somestring";
+-----+
| 123 |
+-----+
| 123 |
+-----+
1 row in set, 1 warning (0.00 sec)
```

Encoded JSON payload with `password` as `0` (integer). It come through `login_query`

'%s' is been used, but... `flaskext.mysql` decided to treat it as real integer, doens't put `0` in a quote.

The query will be like:
```
SELECT * FROM TABLE_USERS WHERE username='admin' AND password=0 AND pin='12345'
```

Since `pin` column is `INT` type, so this type juggling trick doesn't affect on `pin`. But we can bruteforce it since, there are only 5 digits.

## Writeup
http://quangntenemy.blogspot.com/2014/04/0x3004-ctf.html
