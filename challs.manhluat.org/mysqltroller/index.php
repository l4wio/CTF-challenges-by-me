<title>MySQLTroller</title>
<pre>
<?php
error_reporting(0);

$password  = '@';
$password .= chr(rand(48,122)); # need some salt :D
$temp      = '';

for($i=0;$i<strlen($password);$i++) $temp .= ord($password[$i]);       #convert

$input = !empty($_GET['pass'])?$_GET['pass']:$temp;

$flag  = 'Flag: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

if (md5($_COOKIE['admin'])!=='94970f3dd9a80f69f670f8dd0b2056eb')       #bruteforce?
    $input = preg_replace('/[a-z,\\\\.\s\n\t\#\-\/]/is','',$input); #?

if (empty($input)) exit('<font color=Red><h1>No! </font></h1>');
    
echo 'Your input: '.$input.'<br /><br />';

mysql_connect('localhost','root','19001560');
$query = mysql_query("SELECT {$input}"); # fix
$row   = mysql_fetch_array($query);
$output= (int)$row[0];


echo 'Your output: '.$output.'<br /><br />';

$query = mysql_query("SELECT @");
$row   = mysql_fetch_array($query);
mysql_close();

exit($row[0]);
?>
</pre>
