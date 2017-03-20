<title>CRYPTOWWW</title><pre>
<?php
include('secret.php');


$username = preg_replace('#[^a-z]#i','',$_GET['user']);
$password = preg_replace('#[^a-z]#i','',$_GET['pass']);
if(!$username || !$password) die("Failed");
$HASH = empty($_GET['HASH']) ? sha1(SECRET.$username.$password) : $_GET['HASH']; # if you have a valid hash, pls send us
$API_URL = sprintf('http://localhost/200-cryptoftw_76778cd364f076d2a875071a9b7a559a/api.php?user=%s&pass=%s&HASH=%s',$username,$password,$HASH);


echo "YOUR USER: ".$username."\n";
echo "YOUR PASS: ".$password."\n";
echo "YOUR HASH: ".$HASH."\n";
echo "----\n";
echo file_get_contents($API_URL);
?>
</pre>