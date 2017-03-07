<pre><title>Holes protector! by _ML</title><h1>Holes protector!</h1><a href='./?url=localhost/_ML/challs/curl_story_part_1/admin.php'><h1>DEMO</h1></a>
<h2>Hall of Fame (cURL Lovers):
1st: <a href='http://raz0r.name'>Raz0r</a> (second solution)
2nd: <a href="https://twitter.com/Paul_Axe">@Paul_Axe</a> (first solution)
3rd: <a href='https://twitter.com/Agarri_FR'>@Agarri_FR</a> (second too)
4th: <a href='https://twitter.com/sinfocol'>@sinfocol</a> (second)
5th: Mawekl (both)
6th: Raz0r4x</h2>

Send the flag (and your vector) to me: <a href='mailto:manhluat93.php@gmail.com'>manhluat93.php@gmail.com</a> or <a href='https://twitter.com/manhluat93'>@manhluat</a>.

P/S: This challenge has 2 solutions. It will be good, if you solve it with 2 ways :).
--
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
	$url = "http://".trim(str_replace(array('@'),'',$_GET['url'])); # tricks :p
	echo "[DEBUG] URL: $url\n";
	echo curl($url,"demo=demo;","guest:guest");
}
?>
<!-- index.php.s -->
</pre>
