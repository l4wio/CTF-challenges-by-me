<?php
$ip = $_SERVER['REMOTE_ADDR'];
echo $ip."\n";
if($ip === '127.0.0.1' || $ip === '::1') echo "SVATTT{would_you_prefer_cURL_or_wget?}";
?>