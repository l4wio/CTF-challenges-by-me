<!-- 127.0.0.1 -->
<?php
error_reporting(0);
if (!isset($_COOKIE['login']))
	setcookie('login',$_SERVER['REMOTE_ADDR'],1);

if($_COOKIE['login']!="127.0.0.1")
	die("You're not logged in!");
else
	die("<h1>Ops!</h1><!-- l3v3l___4.php -->");



?>