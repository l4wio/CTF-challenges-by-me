<?php
error_reporting(0);
$flag = file('../../flag.txt');
if ($_GET['x']==="\x01\x03\x03\x07")
	echo $flag[0];
?>