<?php

if($_SERVER['REMOTE_ADDR']!=='127.0.0.1')
	die('Go away!');

include('secret.php');

if($_GET['HASH'] !== sha1(SECRET.$_GET['user'].$_GET['pass']))
	die("HASH IS NOT VALID");

mysql_connect('localhost','crypto100','crypto100');
mysql_select_db('crypto100');

$user = $_GET['user'];
$pass = $_GET['pass'];

$query = mysql_query("SELECT * FROM users WHERE username = '{$user}' AND password = '{$pass}'");
$row = mysql_fetch_array($query);
if($row['username']){
	echo "Hello {$row['username']}!\n";
	if($row['username'] === 'admin')
		echo "You got it! Here is your FLAG: www_mix_crypto_ftw"; #censored
}else{
	echo "Login Failed!";
}
?>
