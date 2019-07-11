<?php
define('h4x0r_index',1);

include('config.php');
// include('classes.php');

header("Content-Type: application/json");

if(@$_GET['action'] === 'upgrade'){
	if(!is_login()) die(header("Location: $ROOT_URL"));
	if($_SESSION['level'] < 3){
		$_SESSION['level']++;
		upgrade_level();
	}
	die();
}

if(@$_GET['action'] === 'logout'){
	session_unset();
	die(header("Location: $ROOT_URL"));
}

if(@$_POST['captcha']){

	$response = @$_POST['captcha'];
	if(empty($_SESSION['captcha']) || empty($_SESSION['captcha_answer'])){
		captcha();
		alert('No captcha, please refresh this page');
	}

	$verified = ((int)$response === $_SESSION['captcha_answer']) ? TRUE : FALSE;

	unset($_SESSION['captcha']);
	unset($_SESSION['captcha_answer']);
	captcha(true); // renew captcha

	if(!$verified){
		$json['result'] = -1;
		$json['msg'] = 'Wrong captcha';
		die(json_encode($json));
	}

	if(check_account($_REQUEST['username'],$_REQUEST['password']) === false){
		// No existed account
		register_account($_REQUEST['username'],$_REQUEST['password']);
	}
} else {
	$json['result'] = 0;
	$json['msg'] = 'Please enter the captcha';
	die(json_encode($json));
}


?>
