<?php
// Config
$dbhost = 'localhost';
$dbname = 'test';

// Connect to test database
$m = new Mongo("mongodb://$dbhost:27017");
$db = $m->$dbname;

// select the collection
$collection = $db->shows;
print_r($collection);


$filter = array('$where' => file_get_contents('php://input'));
print_r($collection->findOne($filter));

?>
