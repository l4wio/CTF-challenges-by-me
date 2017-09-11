<?php session_start(); ?>
<!DOCTYPE html>
<html>
<head>
    <title>Lucky Game</title>
    <meta charset="utf-8">
    <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway:200">
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet">
    -->
    <link rel="stylesheet" href="https://unpkg.com/purecss@0.6.2/build/pure-min.css" integrity="sha384-UQiGfs9ICog+LwheBSRCt1o5cbyKIHbwjWscjemyBMT9YCUMZffs6UqUTd0hObXD" crossorigin="anonymous">
    <link rel="stylesheet" href="https://purecss.io/combo/1.18.13?/css/main-grid.css&amp;/css/main.css&amp;/css/menus.css&amp;/css/rainbow/baby-blue.css">
    <style>
    .header{font-family: 'Noto Sans', sans-serif;}
    .header h1{color: rgb(202, 60, 60);}
    .button-error {background: rgb(202, 60, 60);}
    .button-success {background: rgb(28, 184, 65);}
    </style>
</head>
<body>
<div id="layout">
<div id="menu">
    <div class="pure-menu">
        <a class="pure-menu-heading" href="#">TCTF</a>
    </div>
</div>
<div id="main">
    <div class="header">
        <h2>Shall we play a "lucky" game?</h2>
    </div>
<div class="content">
<?php

include('config.php');

if($_GET['debug']=='1') die(highlight_file(__FILE__));

if (!$link=mysqli_connect('localhost', MYSQL_USER,MYSQL_PASSWORD)) die('Connection error');
if (!mysqli_select_db($link,MYSQL_USER)) die('Database error');

$tbls = "SELECT group_concat(table_name SEPARATOR '|') FROM information_schema.tables WHERE table_schema=database()";
$cols = "SELECT group_concat(column_name SEPARATOR '|') FROM information_schema.columns WHERE table_schema=database()";
$query = mysqli_query($link,$tbls,MYSQLI_USE_RESULT);
$tbls_name = mysqli_fetch_array($query)[0];
mysqli_free_result($query);
$query = mysqli_query($link,$cols,MYSQLI_USE_RESULT);
$cols_name = mysqli_fetch_array($query)[0];
mysqli_free_result($query);

// CREATE TABLE users(id int NOT NULL AUTO_INCREMENT,username varchar(24),password varchar(32),points int,PRIMARY KEY (id), UNIQUE KEY(username));
// INSERT INTO users VALUES(1,"admin",md5(password_of_admin),10);
// CREATE TABLE logs(id int NOT NULL,log varchar(64));

foreach($_POST as $k => $v){
    if(!empty($v) && is_string($v))
        $_POST[$k] = trim(mysqli_escape_string($link,$v));
    else
        unset($_POST[$k]);
}

foreach($_GET as $k => $v){
    if(!empty($v) && is_string($v))
        $_GET[$k] = trim(mysqli_escape_string($link,$v));
    else
        unset($_GET[$k]);
}

function filter($s){
    global $tbls_name,$cols_name;
    $blacklist = "sleep|benchmark|order|limit|exp|extract|xml|floor|rand|count|or|and|>|<|\||&|".$tbls_name.'|'.$cols_name; # Ninjas need nothing
    if(preg_match("/{$blacklist}/is",$s)) die("<aside>0ops!</aside>");
    return $s;
}

function register($username,$password){
    global $link;
    $q = sprintf("INSERT INTO users VALUES (NULL,'%s',md5('%s'),10)",
        filter($username),filter($password));
    if(!$query = mysqli_query($link,$q,MYSQLI_USE_RESULT)) return die(mysqli_error($link));
    return TRUE;
}

function login($username,$password){
    global $link;
    $q = sprintf("SELECT * FROM users WHERE username = '%s' AND password = md5('%s')",
        filter($username),filter($password));

    if(!$query = mysqli_query($link,$q,MYSQLI_USE_RESULT)) return die(mysqli_error($link));
    $result = mysqli_fetch_array($query);
    mysqli_free_result($query);
    if(count($result)>0){
        $_SESSION['id'] = $result['id'];
        $_SESSION['user'] = $result['username'];
        return TRUE;
    } else {
        unset($_SESSION['id'],$_SESSION['user']);
        return FALSE;
    }
}

function user_log($s){
    global $link;
    $q = sprintf("INSERT INTO logs VALUES (id+1,'%s')",
        filter($_SESSION['id'].'_'.$s));
    if(!$query = mysqli_query($link,$q)) return die(mysqli_error($link));
    return TRUE;
}

function update_point($p){
    global $link;
    $q = sprintf("UPDATE users SET points=points+%d WHERE id = %d",
        $p,$_SESSION['id']);
    if(!$query = mysqli_query($link,$q)) return die(mysqli_error($link));
    if(!user_log("Update ".$p)) return FALSE;
    return TRUE;
}

function my_point(){
    global $link;
    $q = sprintf("SELECT * FROM users WHERE username = '%s'",
        filter($_SESSION['user']));
    if(!$query = mysqli_query($link,$q,MYSQLI_USE_RESULT)) return die(mysqli_error($link));
    $result = mysqli_fetch_array($query);
    mysqli_free_result($query);
    return (int)($result['points']);
}

switch(@$_GET['action']){
    case 'register':
        if(!empty($_POST['user']) && !empty($_POST['pass']))
            if(!register($_POST['user'],$_POST['pass']))
                die("<aside>Something went wrong!</aside>");
        break;
    case 'login':
        if(!empty($_POST['user']) && !empty($_POST['pass']))
            login($_POST['user'],$_POST['pass']);
        break;
    case 'logout':
        unset($_SESSION['user'],$_SESSION['id']);
        break;
    default:
        break;
}

if(empty($_SESSION['user'])){
    echo <<<EOF
        <form action="?action=register" method=POST class="pure-form pure-form-stacked">
            <fieldset>
                <input type=text name=user required placeholder="Username" />
                <input type=password name=pass required placeholder="Password" />
                <button type="submit" class="pure-button pure-button-primary">Register</button>
            </fieldset>
        </form>

        <form action="?action=login" method=POST class="pure-form pure-form-stacked">
            <fieldset>
                <input type=text name=user required placeholder="Username"  />
                <input type=password name=pass required placeholder="Password" />
                <button type="submit" class="pure-button pure-button-primary button-success">Login</button>
            </fieldset>
        </form>
EOF;
    die();
}

$points = my_point();

if($points == 1337){
    user_log('winner');
    echo "<h3>Well played, we will give you a reward soon.</h3>";
}

echo <<<EOF
    <h1>Hello <a href='?action=logout'>{$_SESSION['user']}</a></h1>
    <h2>You got {$points} points</h2>
    <form method=GET class="grid-panel pure-form-aligned pure-form">
        <div class="bet-control pure-control-group">
            <label for="bet-input">
                Your bet
            </label>
            <input name="bet" id="bet-input" data-content="bet-input"
                   type="number" min="0" max="16" value=1>
        </div>

        <div class="guess-control pure-control-group">
            <label for="guess-input">
                Your guess
            </label>
            <input name="guess" id="guess-input" data-content='guess-input'
                   type="number" min="0" value=1>
        </div>
        <button type="submit" class="pure-button pure-button-primary button-error">Place</button>
    </form>

EOF;

if(!empty($_REQUEST['bet']) && (int)$_REQUEST['bet'] > 0 && !empty($_REQUEST['guess']) && (int)$_REQUEST['guess'] > 0){
    echo "<aside>";
    if($_REQUEST['bet'] > $points) die("What?! you're cheater!");
    $number = rand()%8;
    echo "It is...<h1 style='color:#fff'>".$number."</h2><br />";
    if( $number == $_REQUEST['guess'] ){
        echo "You won!";
        if(!update_point($_REQUEST['bet']))
            echo "<br />failed";
    } else {
        echo "You lost :(";
        if(!update_point(-$_REQUEST['bet']))
            echo "<br />failed";
    }
    echo "</aside>";
}

mysqli_close($link);
?>

</div>
</div>
</div>
</body>
</html>
