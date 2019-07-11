<?php
define('h4x0r_index',1);
include('config.php');
// include('header.php');

$db = open_init_db();
$statement = $db->prepare('SELECT username,level,premium FROM users ORDER BY premium DESC, level DESC LIMIT 10');
$result = $statement->execute();
$result = $statement->get_result();

?>
<style>
td, th {
    text-align: left;
    padding: 8px;
}
th {
    color: #fff;
}
td {
  padding-right:100px;   
}
</style>
<center>
<table style='text-align: center;'>
  <tr>
    <th>Username</th>
    <th>Level</th>
    <th>report</th>
  </tr>
<?php
while($row = $result->fetch_assoc()){
$username = $row['username'];
$username_href = "<a href='${ROOT_URL}user.php/{$username}'>{$username}</a>";
$username_href = $row['username'];

if($row['premium'] > 0){
  $username_href .= ' <i title="Premium account" alt="Premium account" class="icon ion-star"></i>';
}

$report = "<a href='${ROOT_URL}user.php/{$username}#report'><img src='$ROOT_URL/images/Pokeball2.gif' width=40 height=40 /></a>";
echo <<<EOF
  <tr>
    <td>{$username_href}</td>
    <td>{$row['level']}</td>
    <td>{$report}</td>
  </tr>

EOF;
}
?>
</table>
</center>
