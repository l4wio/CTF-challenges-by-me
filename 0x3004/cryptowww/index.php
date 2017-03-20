<title>CRYPTOWWW</title><pre>
<?php
include('secret.php'); # SECRET LENGTH: 20


$username = preg_replace('#[^a-z]#i','',$_GET['user']);
$password = preg_replace('#[^a-z]#i','',$_GET['pass']);
if(!$username || !$password) die("Failed");
$HASH = empty($_GET['HASH']) ? sha1(SECRET.$username.$password) : $_GET['HASH']; # if you have a valid hash, pls send us
$API_URL = sprintf('http://localhost/200-cryptowww_76778cd364f076d2a875071a9b7a559a/api.php?user=%s&pass=%s&HASH=%s',$username,$password,$HASH);

#http://challenges.wargame.vn/200-cryptowww_76778cd364f076d2a875071a9b7a559a/?user=guest&pass=a&HASH=8af419fef46c996c799e98db7081fa75463ccbc4%26pass%3Dguest%2580%2500%2500%2500%2500%2500%2500%2500%2500%2500%2500%2500%2500%2500%2500%2500%2500%2500%2500%2500%2500%2500%2500%2500%2500%2500%2500%2500%2500%2500%2500%2500%2500%25F0%2527%2520or%2520username%253D%2527admin

echo "YOUR USER: ".$username."\n";
echo "YOUR PASS: ".$password."\n";
echo "YOUR HASH: ".$HASH."\n";
echo "----\n";
echo file_get_contents($API_URL);
?>
</pre>