<title>Tester MySQL - Test 1</title>
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
</style><center><img src=banner.jpg />

<table width="400" border="1">
<td><center><font color='White'><b>Title</b></font></center></td><td><center><font color='White'><b>Content</b></font></center></td>
<?php
include('db_config.php');
$selectall = mysql_query('SELECT id,title,content FROM basic');
while($array = mysql_fetch_array($selectall)) {
	echo "<tr><td><b><a href='content.php?id=".$array['id']."'>".$array['title']."</b></td><td>".substr($array['content'],0,15)."...</td></tr>";
}

?>
</table><br><br><font color=#333333>manhluat93</font></center>
