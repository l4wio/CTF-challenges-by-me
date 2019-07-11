<?php
if (!defined('h4x0r_index')) exit();
$ROOT_URL = 'https://h4x0rs.space/blog/';
define('DB_PATH','/var/www/db/blog.db');
define('TITLE','h4x0r\'s space');
define('SECRET_ADMIN','b43c3f5a01c69f3c3bfe3b0145ba8cc4b948558c5c969ab0110122a5daaa1e9e');

function generateRandomString($length = 10) {
    return substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length/strlen($x)) )),1,$length);
}
$nonce = md5(random_bytes(32).'__wut__');

function alert($s){
	global $nonce, $ROOT_URL;
	return die("<script nonce={$nonce}>alert(atob('".base64_encode($s)."'));location.href='{$ROOT_URL}';</script>");
}

function open_init_db($path) {
	if(!file_exists($path)){
		$db = new SQLite3($path);
		$db->query('CREATE TABLE IF NOT EXISTS "posts" (
		    "id" VARCHAR(64) PRIMARY KEY NOT NULL ,
		    "title" VARCHAR(255),
		    "image_type" VARCHAR(4),
		    "time" DATETIME
		)');
		$db->query('CREATE TABLE IF NOT EXISTS "reports" (
		    "id" VARCHAR(64) PRIMARY KEY NOT NULL ,
		    "visited" BOOLEAN,
		    "time" DATETIME
		)');
		$db->query('CREATE TABLE IF NOT EXISTS "captcha" (
		    "ip" VARCHAR(32) PRIMARY KEY NOT NULL ,
		    "captcha" VARCHAR(64),
		    "salt" VARCHAR(32),
		    "time" DATETIME
		)');

		$statement = $db->prepare('INSERT INTO "posts" ("id", "title", "image_type","time")
			VALUES (:id, :title, :image_type, :time)');
		$statement->bindValue(':id', '15e8f6b2408ea136dd2e62dec47ceabc3b0ec9d1d99eebd740853ae23b6db375');
		$statement->bindValue(':title', 'FLAG');
		$statement->bindValue(':image_type', '');
		$statement->bindValue(':time', date('Y-m-d H:i:s'));
		$statement->execute();
		$file = "/var/www/blog_data/15e8f6b2408ea136dd2e62dec47ceabc3b0ec9d1d99eebd740853ae23b6db375.txt";
		file_put_contents($file, "Great job!!![br][h2]m0ar_c00l_bugs_finally_u_g0t_persistent_xss}[/h2][br]Hope you enjoyed!");

	}
	else {
		$db = new SQLite3($path);
	}
	return $db;
}

function open_pad($id){
	global $ROOT_URL;
	$db = open_init_db(DB_PATH);
	$statement = $db->prepare('SELECT * FROM posts WHERE id = :id');
	$statement->bindValue(':id',$id);
	$result = $statement->execute();
	$arr = $result->fetchArray(SQLITE3_ASSOC);
	if(!$arr) return false;
	return $arr;
}

function open_report_pad($id){
	global $ROOT_URL;
	$db = open_init_db(DB_PATH);
	$statement = $db->prepare('SELECT * FROM reports WHERE id = :id');
	$statement->bindValue(':id',$id);
	$result = $statement->execute();
	$arr = $result->fetchArray(SQLITE3_ASSOC);
	if(!$arr) return false;
	return $arr;
}

function open_last_report(){
	global $ROOT_URL;
	$db = open_init_db(DB_PATH);
	$statement = $db->prepare('SELECT * FROM reports WHERE visited = 0 ORDER BY time ASC LIMIT 1');
	$result = $statement->execute();
	$arr = $result->fetchArray(SQLITE3_ASSOC);
	if(!$arr) return false;
	return $arr;
}

function remove_report($pad_id){
	global $ROOT_URL;
	$db = open_init_db(DB_PATH);
	$statement = $db->prepare('UPDATE "reports" SET visited = 1, time = :time WHERE id = :id');
	$statement->bindValue(':id', $pad_id);
	$statement->bindValue(':time', date('Y-m-d H:i:s'));
	$result = $statement->execute();
	return $result;
}

header("X-XSS-Protection: 1; mode=block;");
header('X-Content-Type-Options: nosniff');
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header('Referrer-Policy: no-referrer');
?>
