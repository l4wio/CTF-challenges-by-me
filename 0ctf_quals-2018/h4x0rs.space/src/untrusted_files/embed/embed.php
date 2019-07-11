 <?php
define('h4x0r_index',1);
include('../../config.php');
header("Content-Security-Policy: default-src none; frame-src *.youtube.com *.instagram.com; script-src 'nonce-{$nonce}';");
header("X-Frame-Options: SAMEORIGIN");

register_shutdown_function( "fatal_handler" );


$embed_id = $_GET['embed'];
$page = basename($_GET['p']);
$page .= ".inc";

if(!file_exists($page)) {// to make it clear
	header('HTTP/1.1 500 Internal Server Error');
	die("500 Internal Server Error");
}
echo "<!-- DEBUG \n";
echo "embed_id: {$embed_id}\n";
echo "-->\n";

require($page); 

echo "\n<!-- DEBUG \n";
echo "page: {$page}\n";
echo "-->\n";
?>



