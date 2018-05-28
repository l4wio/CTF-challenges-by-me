<?php
session_start();
error_reporting(0);
header("X-XSS-Protection: 1; mode=block;");
header('X-Content-Type-Options: nosniff');
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header('Referrer-Policy: no-referrer');
$CLIENT_URL = "https://h4x0rs.club";

if (!isset($_SESSION['token']) || !isset($_SESSION['token_time']) || (time() - $_SESSION['token_time']) > 60*5 ) {
    $csrf_token = md5(uniqid(mt_rand(), TRUE));
    $_SESSION['token'] = $csrf_token;
    $_SESSION['token_time'] = time();
}
else
{
    $csrf_token = $_SESSION['token'];
}


function enable_cors(){
	global $CLIENT_URL;
    header("Access-Control-Allow-Origin: ".$CLIENT_URL);
    header("Access-Control-Allow-Methods: GET,POST");
    header("Access-Control-Allow-Credentials: true");
}

$script_name = basename($_SERVER['SCRIPT_NAME']);
if($script_name == 'csrf.php'){
    enable_cors();
    die($csrf_token);
}
?>