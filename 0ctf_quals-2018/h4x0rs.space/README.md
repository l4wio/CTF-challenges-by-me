# h4x0rs.space

Since the `document.cookie` of admin is just the half, at the end you have to figure out where is the secret blog id.

Run [solve.py](solve.py) and report the result id to the admin.


Root cause:

Chrome can treat .jpg as .appcache manifest (but with restricted scope). Luckily, `embed.php` is in the scope.


## Flag
### document.cookie
OK! You got me... This is your reward: "flag{m0ar_featureS_" Wait, I wonder if you could hack my server. Okay, shall we play a game? I am going to check my secret blog post where you can find the rest of flag in next 5 seconds. If you know where I hide it, you win! Good luck. For briefly, I will open a new tab in my browser then go to my https://h4x0rs.space/blog.php/*secret_id* . You have to find where is it. 1...2...3...4..5... (Contact me @l4wio on IRC if you have a question)

### secret blog id
https://h4x0rs.space/blog/blog.php/15e8f6b2408ea136dd2e62dec47ceabc3b0ec9d1d99eebd740853ae23b6db375
