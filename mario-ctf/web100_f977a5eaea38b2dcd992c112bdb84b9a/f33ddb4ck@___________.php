<?php
	session_start();
	error_reporting(1);
	function dbinit(){
		$dbname="castle1337.db";
		return new SQLite3($dbname);
	}
	if(@$_GET['xxx'] !== 'mariaozawa' && $_SESSION['user']!=='admin')
		die("? go away!");
	$db = dbinit();
	$prepare=$db->prepare("SELECT * FROM f33db4ck LIMIT 1;");
	$row=$prepare->execute()->fetchArray();
	if($row){
		#headerecho '<script>document.location.href="data:text/html;base64,'.base64_encode($row[1]).'";</script>';
		$prepare=$db->prepare("DELETE FROM f33db4ck WHERE id={$row['id']};");
		$prepare->execute();
		header('Location: view_feedback.php?content='.urlencode(base64_encode($row[1])));
		#if($db->changes()>0)
			#echo "<h3><Ok! deleted record</h3>";

	}else{
		echo "No record!";
	}


?>