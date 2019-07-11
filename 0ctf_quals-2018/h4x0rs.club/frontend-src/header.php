<?php
if (!defined('h4x0r_index')) exit();


if(csp_policy == 2){
// user.php
header("Content-Security-Policy: default-src 'none'; img-src * data: ; script-src 'nonce-{$nonce}'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; frame-src https://www.google.com/recaptcha/;");
header("X-Frame-Options: SAMEORIGIN");
} else if(csp_policy == -1){
    header("X-Frame-Options: SAMEORIGIN");
} else {
//  normal pages
header("Content-Security-Policy: script-src 'nonce-{$nonce}' 'strict-dynamic';");
header("X-Frame-Options: SAMEORIGIN");
}

?>
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>h4x0rs.club - Pokémon Gym</title>
    <link rel="stylesheet" href="<?=$ROOT_URL?>stylesheets/app-80bb94017b.css">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="shortcut icon" href="favicon.ico">
    
    <meta name="theme-color" content="#6839ff">
    <meta property='og:site_name' value='h4x0rs.club - Pokémon Gym'/>
    <meta property="og:title" content="h4x0rs.club - Pokémon Gym">
    <meta property="og:type" content="game">
    <meta property="og:url" content="https://h4x0rs.club">
    <meta property="og:image" content="https://h4x0rs.club/game/images/Pokeball.png">
    <meta name="author" content="@l4wio 🕵">
    
</head>
<!-- All credit of this awesome template goes to http://designercize.com -->
