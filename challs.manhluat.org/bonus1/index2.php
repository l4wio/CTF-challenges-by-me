<title>Bonus challenge I | #ctf.wargame.vn</title><h1><pre>
<p style='color:Red'>MySQLi Detector v1.0</p>
<?php

$link = mysql_connect('localhost', 'fuel_station','fuel_station1@2@');

if (!$link) {
    die('Could not connect: ' . mysql_error());
}

if (!mysql_select_db('fuel_station')) {
    die('Could not select database: ' . mysql_error());
}

$safe = True;

if (isset($_GET['password'])) {
 
    if (!is_numeric($_GET['password'])) {
        $safe = False;
    }
    $password = $_GET['password'];
    if(preg_match('#sleep|benchmark|floor|rand|count#is',$password))
        die('Don\'t hurt me :-(');
    if(preg_match('#username|password|user#is',$password))
        die('Try to solve without using columns-table name ;)');
    
    $query = mysql_query("SELECT * FROM users2 WHERE password='{$password}'");
    echo "SELECT * FROM users2 WHERE password='{$password}'\n";

    if (!$query)
        $safe = True;

    if (!$safe)
        die("SQL INJECTION DETECTED");
    
    $query = mysql_query("SELECT * FROM users2 WHERE password='{$password}'");
    if (!$query) {
        die('FAILED');
    }
    $row = mysql_fetch_array($query);
    print_r($row);
    if($row['username'] === 'admin'){
        file_put_contents('bonus2.log@.txt',"IP: {$_SERVER['REMOTE_ADDR']} | Level: {$_GET['level']}\r\npassword: {$_GET['password']}\r\n-------------------------------------------\r\n",FILE_APPEND);
        die($row['password']); # password's admin is a flag
    }
    else
        die('NO FLAG FOR YOU!!!');
} else
    echo "Did not find a value for password.";

?>
</h1>
</pre>
<!-- index.php.s -->