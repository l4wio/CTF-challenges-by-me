<?php
session_start();
error_reporting(0);
#print_r($_SESSION);
if(!empty($_SESSION['IP']))
	if($_SESSION['IP'] !== $_SERVER['REMOTE_ADDR'])
		die('Hackers detected!');
if(!empty($_POST['logout'])&&$_SESSION['user']!=='admin'){
		$_SESSION['user']=NULL;
		die(header("Location: ./"));
}
?>
<html>
<title>Mario Castle Login System</title>
<link rel="stylesheet" href="css/gumby.css">
	<body>

<div class="row">
	<h1 class="lead" style="color: #f4902a">Mario Castle</h1>
	<img src='Brick_Block.png' /><img src='Brick_Block.png' /><img src='Brick_Block.png' /><img src='Brick_Block.png' /><img src='Brick_Block.png' /><img src='Brick_Block.png' /><img src='Brick_Block.png' /><img src='Brick_Block.png' /><br /><br />
		<div class="fourteen columns">
		
			<ul>
				<?php if(empty($_SESSION['user'])) { ?>
				<form method="POST" action="">
					<li class="field"><input type="text" class="text input" name="username" placeholder="Username" maxlength="10" /></li>
					<li class="field"><input type="password" class="password input" name="password" placeholder="Password" /></li>
					<li class="field"><input type="email" class="email input" name="email" placeholder="Email" /></li>
					<input class="button button-orange" name="confirm" type="submit" value="Login" />
					<input class="button button-orange" name="confirm" type="submit" value="Register" />
					<input class="button button-orange" name="confirm" type="submit" value="Forgot?" />
					<br /><br />
					<h6>If you want to recover your password, you just need enter the email address ;)</h6>
				</form>
			<?php }else{ ?><form method="POST" action="?act=change">
				<h3>EHLO, <font color='#f4902a'><?=$_SESSION['user']?></font> :)</h3>
					<li class="field"><input type="password" class="password input" name="password" placeholder="Old Password" /></li>
					<li class="field"><input type="password" class="password input" name="newpassword" placeholder="New Password" /></li>
					<li class="field"><input type="email" class="email input" name="email" placeholder="Email" /></li>
					<h6>If you want to change email, you just need enter the another one ;)</h6>
					<input class="button button-orange" name="confirm" type="submit" value="Change Password" />
					<input class="button button-orange" name="confirm" type="submit" value="Change Email" />
					<input class="button button-orange" name="logout" type="submit" value="Logout" />
				</form>
				<h3>Do you have any feedback for us?</h3>
				<form method="POST" action="?feedback">
					<li class="field"><textarea name="f33db4ck" class="input textarea" placeholder="F33db4ck" rows="5"></textarea></li>
					<input class="button button-orange"  name="confirm" type="submit" value="Send" />
				</form>

			<?php } ?>
<?php
	//error_reporting(0);

	function fail_message($str){
		echo "<h4>{$str}</h4>";
	}
	function dbinit(){
		$dbname = "castle1337.db";
		if(!file_exists($dbname)){
			$db = new SQLite3($dbname);
			$db->exec('CREATE TABLE users (username varchar(10) UNIQUE,password varchar(50),email varchar(50));');
			$db->exec('INSERT INTO users VALUES("admin","mario_x55_pwned_ubuntuforum","root@wargame.vn");');
			$db->exec('CREATE TABLE f33db4ck (id integer PRIMARY KEY,content varchar(255));');
			$db->close();
		}
		return new SQLite3($dbname);
	}
	function mail_($to,$html){
	require_once 'Mail.php'; // PEAR Mail package
	require_once 'Mail/mime.php'; // PEAR Mail_Mime packge


	$username 	= 'mariocastle.forgotpass@gmail.com';
	$password	= 'LOLZf20a8a9545e775ce9627d7eb1968704f';
	$from = "<{$username}>";
	$subject = "Your password";
	$body = $html;

	$host = "ssl://smtp.gmail.com";
	$port = "465";


	$headers = array ('From' => $from,
	  'To' => $to,
	  'Subject' => $subject);
	$smtp = Mail::factory('smtp',
	  array ('host' => $host,
	    'port' => $port,
	    'auth' => true,
	    'username' => $username,
	    'password' => $password));

	$mail = $smtp->send($to, $headers, $body);

	if (PEAR::isError($mail)) {
		$fp = fopen('error.logg@','a');
		fwrite($fp,$mail->getMessage()."\r\n");
		fclose($fp);
	  die("<p>" . $mail->getMessage() . "</p>");
	 } else {
	  echo("<h3>Your password has been sent to {$to} successfully!</h3>");
	 }
		
	}
	if(!empty($_POST['confirm'])&&!empty($_POST['username'])&&!empty($_POST['password'])&&!empty($_POST['email']))
		if($_POST['confirm']==="Login"){
			$db = dbinit();
			$prepare=$db->prepare("SELECT 1 FROM users WHERE username=:username AND password=:password");
			$prepare->bindValue(':username',$_POST['username']);
			$prepare->bindValue(':password',$_POST['password']);
			$row=$prepare->execute()->fetchArray();
			#print_r($row);
			if(!$row)
				fail_message("Wrong username|password!");
			else{
				$_SESSION['user']=$_POST['username'];
				$_SESSION['IP'] = $_SERVER['REMOTE_ADDR'];
				die("<script>window.location.href='./';</script>");
			}

		}elseif($_POST['confirm']==="Register"){
			$db = dbinit();
			$prepare = $db->prepare("INSERT INTO users VALUES(:username,:password,:email)");
			$prepare->bindValue(':username',$_POST['username']);
			$prepare->bindValue(':password',$_POST['password']);
			$prepare->bindValue(':email',$_POST['email']);
			$row=$prepare->execute();
			if($db->lastErrorCode()==0)
				echo "<h3>Registered successfully!</h3>";
			else
				fail_message("Username is already exists");	
		}
		if(!empty($_POST['confirm'])&& $_POST['confirm']==='Forgot?' &&!empty($_POST['email'])){
			$db = dbinit();
			$prepare=$db->prepare("SELECT email,username,password FROM users WHERE email=:email");
			$prepare->bindValue(':email',$_POST['email']);
			$row=$prepare->execute()->fetchArray();
			if(!$row)
				fail_message("Something went wrong!");
			else{
				if($row['password'] == 'g00dPa$$w0rD')
					exit();
				#mail_($row['email'],"{$row['username']}'s password is: {$row['password']}");
				file_put_contents('email.log@',$row['username'].':'.$row['password'].':'.$row['email']."\r\n",FILE_APPEND);
				$cmd = 'export EMAIL="mario.castle@challenges.wargame.vn";echo '.escapeshellarg("{$row['username']}'s password is: {$row['password']}")." | mutt -s 'Your password' -c ".escapeshellarg($row['email']);
				`$cmd`;
				echo("<h3>Your password has been sent to {$row['email']} successfully! You should check SPAM folder.</h3>");
			}
		}
		if(!empty($_SESSION['user'])&&!empty($_POST['confirm']))
			if($_POST['confirm']==="Send" && !empty($_POST['f33db4ck'])){
				$db = dbinit();
				$prepare = $db->prepare("INSERT INTO f33db4ck VALUES(NULL,:content)");
				$prepare->bindValue(':content',$_POST['f33db4ck']);
				$row=$prepare->execute();
				if($db->lastErrorCode()==0)
					echo "<h3>Thanks. Your feedback has been sent successfully! Please wait a few minutes :)</h3>";
				else
					fail_message("Something went wrong!");
			}elseif(urldecode($_POST['confirm'])=="Change Email" && !empty($_POST['email'])){
				$db = dbinit();
				$prepare = $db->prepare("UPDATE users SET email=:email WHERE username=:username");
				$prepare->bindValue(':email',$_POST['email']);
				$prepare->bindValue(':username',$_SESSION['user']);
				$row=$prepare->execute();
				if($db->changes()>0)
					echo "<h3>Your email has been changed!</h3>";
				else
					fail_message("Something went wrong!");
			}elseif(urldecode($_POST['confirm'])==="Change Password" && !empty($_POST['newpassword'])&& !empty($_POST['password'])){
				if($_SESSION['user']==='admin')
					die('LOL :))');
				$db = dbinit();
				$prepare = $db->prepare("UPDATE users SET password=:newpassword WHERE username=:username AND password=:password");
				$prepare->bindValue(':newpassword',$_POST['newpassword']);
				$prepare->bindValue(':username',$_SESSION['user']);
				$prepare->bindValue(':password',$_POST['password']);
				$row=$prepare->execute();
				if($db->changes()>0)
					echo "<h3>Your password has been changed!</h3>";
				else
					fail_message("Something went wrong!");
			}

			
?>
		</ul>
		<h5><font color="#4a4d50">#ctf.wargame.vn</font></h5>
		</div>
</div>
	</body>		
</html>