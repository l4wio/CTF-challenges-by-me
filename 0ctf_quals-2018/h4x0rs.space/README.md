# h4x0rs.space

Since the `document.cookie` of admin is just the half, at the end you have to figure out where is the secret blog id.

Run [solve.py](solve.py) and report the result id to the admin.


Root cause:

Chrome can treat .jpg as .appcache manifest (but with restricted scope). Luckily, `embed.php` is in the scope.


