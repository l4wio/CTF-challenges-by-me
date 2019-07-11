<?php
if (!defined('h4x0r_index')) exit();

header("Content-Security-Policy: default-src none; frame-src {$ROOT_URL}untrusted_files/embed/embed.php https://www.google.com/recaptcha/; script-src 'nonce-{$nonce}'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com; img-src *; connect-src {$ROOT_URL}report.php; ");
header("X-Frame-Options: SAMEORIGIN");


$TITLE = TITLE;

?>
<!DOCTYPE HTML>
<!--
Caminar by TEMPLATED
templated.co @templatedco
Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
-->
<html>

<head>
	<title><?=$TITLE?></title>
	<meta charset="utf-8" />
	<meta name="author" content="@l4wio 🕵">
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="referrer" content="no-referrer">

	<meta property='og:site_name' value='h4x0rs.space'/>
    <meta property="og:title" content="h4x0rs.space">
    <meta property="og:type" content="blog">
    <meta property="og:url" content="https://h4x0rs.club">
    <meta property="og:image" content="https://h4x0rs.space/blog/images/logo.png">

	<script nonce='<?=$nonce?>' src='https://www.google.com/recaptcha/api.js'></script>

	<link rel="stylesheet" href="<?=$ROOT_URL?>assets/css/main.css" />
	<link rel="stylesheet" href="<?=$ROOT_URL?>assets/css/style.css" />
	<link rel="stylesheet" href="<?=$ROOT_URL?>assets/css/style2.css" />
	<?php
	$max_bg = 51;
	// for($i=1;$i<=$max_bg;$i++)
	// 	echo "		<link rel=preload href='{$ROOT_URL}images/bg{$i}.jpg' as='image' />\n";
	?>

	<style>
	    body:after{
			background-image: url(<?=$ROOT_URL?>images/bg<?=rand(1,$max_bg)?>.jpg);
			/*shout-out to the artists from deviantart.com for awesome background.*/
			opacity:0.6;
		}
	</style>
</head>

<body>
	<!-- Header -->
	<header id="header">
	<div class="logo">
	    <a href="<?=$ROOT_URL?>" id=title_blog><?=@$pad_title?$pad_title:$TITLE?></a>
	</div>

	</header>