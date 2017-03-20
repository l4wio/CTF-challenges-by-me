<?php
error_reporting(0);
$data = base64_decode($_GET['content']);
file_put_contents("content.log@",$data."\r\n",FILE_APPEND);
echo $data;

?>