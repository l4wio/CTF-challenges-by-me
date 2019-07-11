<?php
if (!defined('h4x0r_index')) exit();
session_set_cookie_params(3600*10);
session_start();
$ROOT_URL = 'https://h4x0rs.club/game/';
$BACKEND_URL = 'https://backend.h4x0rs.club/';
define('MYSQL_HOST','localhost');
define('MYSQL_USER','game_frontend');
define('MYSQL_DB','game_database');
define('MYSQL_PASSWORD','f9eee43ecf40b497998159073bbc0c6f0839ea35d0b04398e5620a5274bd4131');
define('TITLE','h4x0r\'s club');

$db = NULL;

$nonce = md5(random_bytes(32).'__wut__');

function captcha($renew=false){
    $ops = array("+","-","*","%");
    if(!empty($_SESSION['captcha']) && $renew === false ) return;
    $_SESSION['captcha'] = mt_rand(1337,13371337).$ops[mt_rand(0, count($ops) - 1)].mt_rand(1337,13371337);
    $_SESSION['captcha_answer'] = eval('return '.$_SESSION['captcha'].';');
}

function alert($s,$p=''){
    global $nonce, $ROOT_URL;
    return die("<script nonce={$nonce}>alert(atob('".base64_encode($s)."'));location.href='{$ROOT_URL}$p';</script>");
}

function open_init_db() {
    global $db;
    if($db) return $db;
    $db = new mysqli(MYSQL_HOST,MYSQL_USER,MYSQL_PASSWORD,MYSQL_DB);
    if(!$db) die('Failed to connect database');
    return $db;
}


function is_login(){
    return (!empty($_SESSION['uid']) && !empty($_SESSION['username'])) ? TRUE : FALSE;
}
function login_as_admin(){
    $db = open_init_db();
    $admin_user_id = 1;
    $statement = $db->prepare('SELECT * FROM users WHERE id=?');
    $statement->bind_param('i',$admin_user_id);
    $result = $statement->execute();
    $result = $statement->get_result();
    if($result->num_rows === 0) return false;
    $row = $result->fetch_assoc();
    login_ok($row);
}


function login_ok($row){
    $_SESSION['uid'] = $row['id'];
    $_SESSION['username'] = $row['username'];
    $_SESSION['game_token'] = $row['token'];
    $_SESSION['level'] = $row['level'];
    $_SESSION['biography'] = $row['biography'];
    $_SESSION['premium'] = $row['premium'];
    $_SESSION['visible_bio'] = $row['visible_bio'];

    $db = open_init_db();
    $statement = $db->prepare('UPDATE users SET IP = ? WHERE id = ?');
    $statement->bind_param('si', $_SERVER['REMOTE_ADDR'], $_SESSION['uid']);
    $result = $statement->execute();

    if($result){
        $json['result'] = 1;
        $json['msg'] = 'Login successfully';
        return json_encode($json);
    }    
}

function upgrade_level(){
    if($_SESSION['username'] === 'admin' || $_SESSION['uid'] == 1) return false;
    if(!($_SESSION['uid'] > 1)) return false;
    $db = open_init_db();
    $statement = $db->prepare('UPDATE users SET level=level+1,state=? WHERE id = ?');
    $statement->bind_param('ii', time(), $_SESSION['uid']);
    $result = $statement->execute();

    if($result){
        $json['result'] = 1;
        $json['msg'] = 'Upgrade successfully';
        die( json_encode($json) );
    }    
}

function change_bio($bio,$perm){
    if($_SESSION['username'] === 'admin' || $_SESSION['uid'] == 1) return false;
    if($_SESSION['uid'] <= 1) return false;
    $db = open_init_db();
    $statement = $db->prepare('UPDATE users SET biography=?, visible_bio=? WHERE id = ?');
    $statement->bind_param('sii', $bio,$perm, $_SESSION['uid']);
    $result = $statement->execute();

    if($result){
       return true;
    }    
    return false;
}

function check_account($username,$password,$login=1){
    $password = hash('sha256',$password);
    $username = $username;
    if(!preg_match('/^[a-z0-9_]{5,16}$/is',$username)){
        $json['result'] = -1;
        $json['msg'] = 'Invalid username. Username must be /[a-z0-9_]{5,16}/';
        die( json_encode($json) );
    }

    $db = open_init_db();
    $statement = $db->prepare('SELECT * FROM users WHERE username=?');
    $statement->bind_param('s',$username);
    $result = $statement->execute();
    $result = $statement->get_result();
    if($result->num_rows === 0) return false;
    $row = $result->fetch_assoc();

    if($login === 1) {
        if($password === $row['password']){
            // SUCCESS LOGIN
            die(login_ok($row));

        } else {
            $json['result'] = -1;
            $json['msg'] = 'Wrong username/password.';
            die( json_encode($json) );
        }
    } else {
        return $row;
    }
}

function register_account($username,$password){
    $password = hash('sha256',$password);
    $username = $username;
    if(!preg_match('/^[a-z0-9_]{5,16}$/is',$username)){
        $json['result'] = -1;
        $json['msg'] = 'Invalid username. Username must be /[a-z0-9_]{5,16}/';
        die( json_encode($json) );
    }

    $game_token = bin2hex(random_bytes(32));
    $level = 0;
    $visible = 0;
    $bio = '';
    $premium = 0;
    $time_ = time();
    $db = open_init_db();

    $statement = $db->prepare('INSERT INTO users VALUES(NULL,?,?,?,?,?,?,?,?,?)');
    $statement->bind_param('ssssiiisi',
                $username,
                $password,
                $game_token,
                $bio,$visible,
                $level,
                $time_,
                $_SERVER['REMOTE_ADDR'],
                $premium
            );
    $result = $statement->execute();

    if(!$result) return false;
    if($db->insert_id > 1){
        $row = array(
            'id' => $db->insert_id,
            'username' => $username,
            'token' => $game_token,
            'level' => 0,
            'biography' => '',
            'premium' => 0,
            'visible_bio' => 0
        );
        // SUCCESS LOGIN
        die(login_ok($row));
    }

}

function insert_report($url){
    global $ROOT_URL;
    $db = open_init_db();
    if(trim($url) == 'https://h4x0rs.club/game/user.php/admin') return true;
    $statement = $db->prepare('INSERT INTO reports VALUES(NULL,?,0,NULL)');
    $statement->bind_param('s',$url);
    $result = $statement->execute();
    if($result) return true;
    return false;
}

function open_last_report(){
    $db = open_init_db();
    $statement = $db->prepare('SELECT * FROM reports WHERE visited = 0 ORDER BY ts ASC LIMIT 1');
    $result = $statement->execute();
    $result = $statement->get_result();
    if($result->num_rows === 0) return false;
    $row = $result->fetch_assoc();
    return $row;
}

function remove_report($report_id){
    $db = open_init_db();
    $statement = $db->prepare('UPDATE reports SET visited = 1 WHERE id = ?');
    $statement->bind_param('i', $report_id);
    $result = $statement->execute();
    return $result;
}



header("X-XSS-Protection: 1; mode=block;");
header('X-Content-Type-Options: nosniff');
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header('Referrer-Policy: no-referrer');


?>