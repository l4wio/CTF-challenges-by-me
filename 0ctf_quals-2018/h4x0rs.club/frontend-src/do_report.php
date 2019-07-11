<?php
define('h4x0r_index',1);

include('config.php');
include('classes.php');

// header("Content-Type: application/json");

if(!is_login())
    die(header("Location: $ROOT_URL"));

if(@$_POST['url_report']){
	$url = $_POST['url_report'];

	if(!preg_match('/^https:\/\/h4x0rs\.club\/game\/user\.php\/[\w#]+$/s',$url)){
		alert("Don't fool me, pls!");
	}

	$response = @$_POST['g-recaptcha-response'];
	$cap = new GoogleRecaptcha();
    $verified = $cap->VerifyCaptcha($response);
	

	// For dumb captcah
	// if(empty($_SESSION['captcha']) || empty($_SESSION['captcha_answer'])){
	// 	captcha();
	// 	alert('No captcha');
	// }
	// $verified = ((int)$response === $_SESSION['captcha_answer']) ? TRUE : FALSE;
	// var_dump($_SESSION);
	// die();

	if(!$verified){
		alert('Wrong captcha');
	}

/*	unset($_SESSION['captcha']);
	unset($_SESSION['captcha_answer']);
	captcha(true); // renew captcha*/

	if(insert_report($url)){
		alert("Thank you!\nWe will take a look at this account URL for sure.\nAlso notice that, I won't do any interaction on this URL. If someone still flood this function, I will enable the real captcha for this.");
	} else {
		alert("Something went wrong");
	}

	
} else {
	alert('Please enter URL');
}


?>
