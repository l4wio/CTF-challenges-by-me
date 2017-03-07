<title>Holes protector! by _ML</title><pre>
<h1>Holes protector!</h1><a href='./?url=localhost:1337/_ML/challs/curl_story_part_1/admin.php'><h1>DEMO</h1></a>
<?php
function curl($url,$cookie='',$userpwd='',$post=''){

	$ch = curl_init();
	curl_setopt($ch,CURLOPT_URL,$url);
	curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
	curl_setopt($ch,CURLOPT_COOKIE,$cookie);
	curl_setopt($ch,CURLOPT_FOLLOWLOCATION,1);
	curl_setopt($ch,CURLOPT_TIMEOUT,5);
	curl_setopt($ch,CURLOPT_AUTOREFERER,true);
	curl_setopt($ch,CURLOPT_HTTPHEADER,array('Authorization: Basic '.base64_encode($userpwd))); #demo guest:guest
	if($post != ''){
		curl_setopt($ch,CURLOPT_POST,1);
		curl_setopt($ch,CURLOPT_POSTFIELDS,$post);
	}
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST,0);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	$result = curl_exec($ch);
	curl_close($ch);
	return $result;
}
if(isset($_GET['url']) && is_string($_GET['url']) && !empty($_GET['url'])){
	$url = "http://".trim(str_replace(array('@'),'',$_GET['url']));
	echo "[DEBUG] URL: $url\n";
	echo curl($url,"demo=demo;","guest:guest");
}
?>
<!-- index.php.s -->
</pre>
