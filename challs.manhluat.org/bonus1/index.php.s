<title>Bonus challenge I | #ctf.wargame.vn</title><h1><pre>
<p style='color:Red'>MySQLi Detector v1.0</p>
<?php
#LightOS's challenge
$link = mysql_connect('localhost', 'db_user','xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');

if (!$link) {
    die('Could not connect: ' . mysql_error());
}

if (!mysql_select_db('test')) {
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
        $flag = 'Your flag: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; #censored
    }
    else{
        $query = mysql_query("SELECT 1 FROM users WHERE id=" . $id);
        $flag = 'Your flag: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; #censored
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
    
    if($row['username'] === 'h4x0r')
        die($flag);
    else
        die('NO FLAG FOR YOU, NOOB!!!');
} else
    echo "Did not find a value for id.";

?>
</h1>
</pre>
