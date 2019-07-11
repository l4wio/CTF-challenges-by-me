<?php
define('h4x0r_index',1);
include('config.php');
// include('header.php');

if($_POST['submit']){

	$title = $_POST['title'];
	$pad_content = $_POST['pad'];

	if(strlen($title) > 128 || strlen($pad_content) > 700){
		alert("Title/Content is too long! This is just BETA version. Sorry for the inconvenience!");
	}

	$hash_pad_id = hash("sha256","BLAH".time().mt_rand().rand().random_bytes(24)."BLEH");
	$target_dir = "untrusted_files/";

	$db = open_init_db(DB_PATH);

	$statement = $db->prepare('INSERT INTO "posts" ("id", "title", "image_type","time")
			VALUES (:id, :title, :image_type, :time)');
	$statement->bindValue(':id', $hash_pad_id);
	$statement->bindValue(':title', $title);
	$statement->bindValue(':time', date('Y-m-d H:i:s'));

	if(@$_FILES['image'] && @$_FILES['image']['error'] == 0){
		// alert('Image is too big');
		$img = $_FILES['image'];
		
		
		$target_file = basename($_FILES["image"]["name"]);
		$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
		$allowed = array("jpeg","jpg","png","bmp","gif","svg");

		if($img['size'] >= 1024*300){
			unlink($img['tmp_name']);
			alert('Image is too big');
		}
		if (!in_array($imageFileType, $allowed)){
			unlink($img['tmp_name']);
			alert("Invalid image");
		}
		$target_file = $target_dir . $hash_pad_id . '.' . $imageFileType;

		if (move_uploaded_file($img["tmp_name"], $target_file)) {
        	unlink($img['tmp_name']);
        	$statement->bindValue(':image_type', $imageFileType);
	    } else {
	        alert("Error occurs during upload file. please try again.");
	    }

	} else {
		$statement->bindValue(':image_type', ''); // NULL, no file was uploaded.
	}

	if($statement->execute()){
		$file= "/var/www/blog_data/".$hash_pad_id.".txt";
		$data = $pad_content;
		// die();
		file_put_contents($file, $data , LOCK_EX);
		die(header("Location: {$ROOT_URL}blog.php/{$hash_pad_id}"));
	} else {
		alert("Error occurs.");
	}
} else {
	die(header("Location: {$ROOT_URL}"));
}

?>
