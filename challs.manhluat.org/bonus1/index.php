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

if (isset($_GET['id'])) {
    # If id is not numeric than it probably isn't safe.
    if (!is_numeric($_GET['id'])) {
        $safe = False;
    }
    $id = mysql_real_escape_string($_GET['id']); # some anti-sqli ????
    if(preg_match('#sleep|benchmark|floor|rand|count#is',$id))
        die('Don\'t hurt me :-(');
    if(preg_match('#username|id|users#is',$id))
        die('Try to solve without using columns-table name ;)');
    # Test the value of id with a "safe" query to determine if SQLi or not.
    if($_GET['level'] === '1'){
        $query = mysql_query("SELECT 1 FROM dual WHERE 1=" . $id);
        $flag = 'Your flag: ok_go_to_level2_sqli_warriors_;)_harder';
    }
    else{
        $query = mysql_query("SELECT 1 FROM users WHERE id=" . $id);
        $flag = 'Your flag: done_u_are_true_sqli_warriors_SWAGSWAG_harder';
    }

    # If query doesn't run than there is most likely no risk of SQLi.
    if (!$query)
        $safe = True;
    
    # Value of id is not safe, possible SQLi.
    if (!$safe)
        die("SQL INJECTION DETECTED");
    
	# Our "safe" query did not execute, should be safe to run on real query.
    $query = mysql_query("SELECT username FROM users WHERE id=" . $id);
    if (!$query) {
        die('FAILED');
    }
    $row = mysql_fetch_array($query);
    #print_r($row);
    if($row['username'] === 'h4x0r'){
        file_put_contents('bonus1.log@.txt',"IP: {$_SERVER['REMOTE_ADDR']} | Level: {$_GET['level']}\r\nID: {$_GET['id']}\r\n-------------------------------------------\r\n",FILE_APPEND);
        die($flag);
    }
    else
        die('NO FLAG FOR YOU, NOOB!!!');
} else
    echo "Did not find a value for id. <a href='./?level=1&id=1' />Level 1</a> | <a href='./?level=2&id=1' />Level 2</a>";

?>
</h1>
</pre>
<!-- index.php.s -->