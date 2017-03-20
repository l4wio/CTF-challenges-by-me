<html>
<title>DOTO2 Items Contest - best Contest :good:</title>
<style>
body{
	background-image:url("dota2.png");
	color: #fff;
	font-family: 'Trade Winds', cursive;
}
input{
	font-family: 'Trade Winds', cursive;
}
input.submit{
	background: #000;
	color: #fff;
}

</style>
<link href='http://fonts.googleapis.com/css?family=Trade+Winds' rel='stylesheet' type='text/css'>
<body>
<?php




session_start();
include('data.php');

function random_items(){
	GLOBAL $all_items;
	$_SESSION['last_time'] = time();
	return $all_items[mt_rand(0,count($all_items))];
}

$MAX = 40;
$SECONDS = 5;

if(@$_SESSION['count'] === 0)
	die("OK OK, your FLAG lah: 0x3004{wanna_play_doto_with_me?}.");

if(empty($_SESSION['count']))
	$_SESSION['count'] = $MAX;

if(empty($_SESSION['question']))
	$_SESSION['question'] = random_items();

if(@$_POST['gold']){
	if((time() - $_SESSION['last_time']) > $SECONDS){
		$_SESSION['count'] = $MAX;
		$_SESSION['question'] = null;
		$_SESSION['last_time'] = time();
		die("<h1>Slow hand lah, NOOB lah!! Uninstall DOTA2 please :).</h1>");
	}

	$right = ((int)$_POST['gold'] === (int)$_SESSION['question']['price']) ? true : false;

	if($right)
		$_SESSION['count'] -= 1;
	else{
		$_SESSION['count'] = $MAX;
		$_SESSION['question'] = random_items();
		die("<h1>WRONGGGGGGGGGGG!!!</h1>");
	}

	$_SESSION['question'] = random_items(); // next question
}

$question = $_SESSION['question'];

echo "{$_SESSION['count']} TIMES REMAINING!<br />";

$color = array('Orange','Yellow','Red');
$color = $color[rand(0,count($color)-1)];

echo "<h1 style='color: {$color};'>{$question['name']}</h1><img src='{$question['img']}' /><br />";

echo "<form method=POST action='./'><h3>It costs <input type=text name=gold id=gold size=5 /> gold ?.</h3><br /><input type=submit value=Answer class=submit /></form>";

?>
</body>
</html>