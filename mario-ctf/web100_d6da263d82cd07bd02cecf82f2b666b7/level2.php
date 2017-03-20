<?php
error_reporting(0);
if (!isset($_COOKIE['login']))
	setcookie('login',0,1);

if($_COOKIE['login']!="1")
	die("You're not logged in!");
else
	die("<h1>Ops!</h1><!-- l3v3l_3.php -->");

?>