# h4x0rs.date updates

Another unintended way comes from [@tyage](https://twitter.com/tyage/status/1001307576296861696)

He's abusing `<iframe csp=...>` (`id=msg` doesn't matter)

By enabling csp before loading itself, it prevents from loading script-src 'self' (csp.js), so CSP is never turned on. 

![CSP in iframe](https://i.imgur.com/RVCrwUq.png)

## Root cause

Since `profile.php` is not setting CSP at the header or `<meta>` tag. Turns out that it's possible to set csp at iframe attributes

https://w3c.github.io/webappsec-csp/embedded/#csp-attribute


