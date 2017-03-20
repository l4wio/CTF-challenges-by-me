<?php
error_reporting(0);
if (isset($_GET['id'])){
	$id = $_GET['id'];
	$db = new Sqlite3("level7.db");
	$result = $db->query("SELECT * FROM users WHERE id=(\"$id\");")->fetchArray();
	echo "Hello {$result['username']}!";
}else{
	header("Location: ?id=1");
}
?>