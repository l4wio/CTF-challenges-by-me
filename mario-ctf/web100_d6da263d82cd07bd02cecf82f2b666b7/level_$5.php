<!-- if($ip="127.0.0.1") flag(); -->
<?php
error_reporting(0);
print_r($_SERVER);
echo "<br /><br />";
$ip = isset($_SERVER['HTTP_X_FORWARDED_FOR'])?$_SERVER['HTTP_X_FORWARDED_FOR']:$_SERVER['REMOTE_ADDR'];

echo "Your IP: <strong>{$ip}</strong><br />";

if($ip!="127.0.0.1")
	die("You're not an admin! Get out X-(");
else
	die("<h1>Ops!</h1><!-- lev3l_$6_.php -->");

?>