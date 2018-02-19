<link rel="stylesheet" type="text/css" href="lul.css">
<pre>
<h3>🔥 Hall of Fame 🔥</h3>
<?=file_get_contents('hof.txt');?>
<hr>
<?php
// Connect to localhost:8888 to get the flag
if($_GET['👉🏻'] == '👌🏻') die(phpinfo());
$_ = $_GET['⁣'];
highlight_file(__FILE__);

if(preg_match("/[\w]{4,}/is",$_) || preg_match("/\[|\"|'|\||\^|~|\./is",$_)) // mình thích thì mình block hoy 👯
	 die("🙅"); // 4cm is too much
eval(substr($_,0,30));
