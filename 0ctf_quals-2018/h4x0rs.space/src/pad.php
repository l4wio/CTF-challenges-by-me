<?php
define('h4x0r_index',1);
include('config.php');

$pad_id = $_GET['id'];

/* GET PAD */


$filter = array('<','>','\'','"','=','(',')','.',';');
$callback = str_replace($filter,"",$_GET['callback']);

// $callback = htmlspecialchars($_GET['callback'], ENT_QUOTES);
$callback = substr($callback,0,8);



$pad = open_pad($pad_id);

if(!$pad || !preg_match('/^[a-f0-9]{64}$/is',$pad_id)){
	$data = NULL;
} else {
	
	$data['data'] = base64_encode(file_get_contents('/var/www/blog_data/'.$pad_id.'.txt'));
	$data['id'] = $pad['id'];
	$data['title'] = $pad['title'];
	$data['time'] = $pad['time'];
	$data['image_type'] = $pad['image_type'];
}

$data = json_encode($data,JSON_UNESCAPED_SLASHES);

header("Content-type: text/javascript");

echo "{$callback}({$data});";
?>
