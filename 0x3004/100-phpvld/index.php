<?php
error_reporting(0);
require_once('flag.php');
$s1 = $_GET[md5($_SERVER['REMOTE_ADDR'])];
$s2 = $_GET[md5($_SERVER['HTTP_USER_AGENT'])];
if($s1 != $s2)
	if(md5($s1) === hash("md5",$s2))
		if( hash("sha512",$s1,true) != hash("sha512",$s2,true) )
			echo "You got it ;) Here is your flag: ".FLAG;
?>