<title>Br0kenMySQL</title><h1><pre>
<p style='color:Red'>Br0kenMySQL</p>
<?php

if($_GET['debug']=='🕵') die(highlight_file(__FILE__));

require '../config.php';

$link = mysqli_connect('localhost', MYSQL_USER, MYSQL_PASSWORD);

if (!$link) {
    die('Could not connect: ' . mysql_error());
}

if (!mysqli_select_db($link,MYSQL_USER)) {
    die('Could not select database: ' . mysql_error());
}
    $id = $_GET['id'];
    if(preg_match('#sleep|benchmark|floor|rand|count|select|from|\(|\)|time|date|sec|day#is',$id))
        die('Don\'t hurt me :-(');
    $query = mysqli_query($link,"SELECT username FROM users WHERE id = ". $id);
    $row = mysqli_fetch_array($query);
    $username = $row['username'];
    
    if($username === 'guest'){
        sleep(5); // wait
        $ip = @$_SERVER['HTTP_X_FORWARDED_FOR']!="" ? $_SERVER['HTTP_X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR'];
        if(preg_match('#sleep|benchmark|floor|rand|count|select|from|\(|\)|time|date|sec|day#is',$ip))
            die('Don\'t hurt me :-(');
        var_dump($ip);
        if(!empty($ip))
            mysqli_query($link,"INSERT INTO logs VALUES('{$ip}')");

        $query = mysqli_query($link,"SELECT username FROM users WHERE id = ". $id);
        $row = mysqli_fetch_array($query);
        $username = $row['username'];
        if($username === 'admin'){
            echo "What, again ???????!@#$!@#$!@#$\n";
            echo "Last one, promise!\n";
            die(FLAG_3);
        }
        echo "Nothing here";
    } else {
        echo "Hello ".$username;
    }




?>
</h1>
</pre>
