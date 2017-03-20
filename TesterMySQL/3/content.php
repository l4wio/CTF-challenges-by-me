<title>Tester MySQL - Test 3</title>
<style>
body {
font-family:Tahoma;
background-color:#000;
color: #99CC00;
}
table {
border-collapse:collapse;
border-color:#999;
}
a {
	font-size: 12px;
	color: #99CC00;
}
a:link {
	text-decoration: none;
}
a:visited {
	text-decoration: none;
	color: #99CC00;
}
a:hover {
	text-decoration: underline;
	color: #FFFFFF;
}
a:active {
	text-decoration: none;
	color: #99CC00;
}

</style><center><img src=banner.jpg /><br>



<?php
if (!empty($_GET['id'])) {
include('db_config.php');
$selectall = mysql_query('SELECT id,title,content FROM basic WHERE id='.intval($_GET['id'])) or die (mysql_error());
$count = mysql_query('SELECT count FROM basic WHERE id='.intval($_GET['id'])) or die (mysql_error()); 
while($arraycount = mysql_fetch_array($count)) {
$arraycount['count']++;
$countupdate = intval($arraycount['count']);
break;
}
$update = mysql_query('UPDATE basic SET count='.$countupdate.' WHERE id='.$_GET['id']) or die (mysql_error());

while($array = mysql_fetch_array($selectall)) {
echo "<font color=White size=5><b>".$array['title']." ($countupdate Views)</b></font><br><br>".$array['content'];
}
} else {
echo "<font color=White size=5><b>No data</b></font>";
}

?>
<br><br><br>
<a href=index.php>[ Back ]</a><br>
<font color=#333333>manhluat93</font>

