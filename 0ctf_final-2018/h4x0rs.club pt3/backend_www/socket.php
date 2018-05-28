<?php
require "csrf.php";
ini_set('default_socket_timeout', 5);
header("Content-type: application/json");

$token = addslashes($_REQUEST['token']);
$packet = $_REQUEST['api_key'].$token;

if(strlen($packet) != 128){
    die(json_encode(["result"=>-1]));
}

function craft_value($cmd){
    $cmd = (string)$cmd;
    if(strlen($cmd) == 0 || strlen($cmd) > 0xff) die("Invalid size of command");
    return chr(strlen($cmd)).$cmd;
}

function send_to_server($p){
    $fp = fsockopen("127.0.0.1", 9999, $errno, $errstr, 5);
    // Please do not forget to bind the binary on 127.0.0.1 only.  /etc/xinetd.d/backend
    if (!$fp) {
        echo "$errstr ($errno)<br />\n";
    } else {
        if (!stream_set_timeout($fp, 5)) die("Could not set timeout");
        fwrite($fp, $p);
        $data = "";
        while (!feof($fp)) {
            $data .= fgets($fp, 128);
        }
        fclose($fp);
        $data = trim($data);
        return $data;
    }

}

function ping(){
    global $packet;
    $packet .= craft_value("ping");
    $result = send_to_server($packet);

    if($result == 'OK'){
        return json_encode(["result"=>1]);
    } else {
        return json_encode(["result"=>0]);
    }
}

function question(){
    global $packet;
    $packet .= craft_value("question");
    $result = send_to_server($packet);

    if(strlen($result) > 0){
        $json['result'] = 1;
        $data = explode('------------------------------------------',$result);
        $json['data'] = base64_encode($data[0]);
        $json['choices'] = base64_encode(trim($data[1]));
        return json_encode($json);
    } else {
        $json['result'] = 0;
        return json_encode($json);
    }
}

function answer($ans){
    global $packet;
    $packet .= craft_value("answer");
    $packet .= craft_value(empty($ans) ? "NaN" : $ans);
    $result = send_to_server($packet);

    if($result == 'correct'){
        return json_encode(["result"=>1]);
    } else {
        return json_encode(["result"=>0]);
    }

}

function badges($name){

    if(preg_match('/backend/is',$name)){
        $json['result'] = -1;
        $json['error'] = "Hacker detected";
        return json_encode($json);
    }

    global $packet;
    $packet .= craft_value("badges");
    $packet .= craft_value($name);
    $result = send_to_server($packet);

    if(strlen($result) == 0){
        return json_encode(["result"=>0]);
    } else {
        $json['result'] = 1;
        $json['data'] = $result;
        return json_encode($json);
    }
}

function save_game($user){
    // This is for premium account only, will be released in the future.
    global $token;
    global $packet;
    $log_file = "/tmp/save_game/".md5($_SERVER['REMOTE_ADDR'].$user.$token.random_bytes(32));

    $packet .= craft_value("save_game");
    $packet .= craft_value($user);
    $packet .= craft_value($_SERVER['REMOTE_ADDR']);
    $result = send_to_server($packet);
    if(strlen($result) > 0){
        if(!file_exists("/tmp/save_game/")) mkdir("/tmp/save_game/");
        file_put_contents($log_file, $result);
        $json['result'] = 1;
        $json['save_path'] = $log_file;
    } else {
        $json['result'] = 0;
        $json['msg'] = 'This is for premium users only';
    }
    return json_encode($json);
}



function check_perm(){
    // This is secret function for admin only 🙊.
    // if($_SERVER['REMOTE_ADDR'] !== "159.65.235.171")
    //     die("You have no permission");
    if($_REQUEST['csrf'] !== $_SESSION['token'])
        die("Invalid csrf token");
    enable_cors();
}

function backup_s3cr3t_($password,$key){
    // under construction
    global $packet;
    $packet .= craft_value("backup_s3cr3t_");
    $packet .= craft_value($password);
    $packet .= craft_value($key);
    $result = send_to_server($packet);

    if(strlen($result) == 0) return json_encode(["result"=>-1]);

    $json['msg'] = base64_encode($result);
    return json_encode($json);
}


switch(@$_REQUEST['action']){
    case 'answer':
        die(answer($_REQUEST['answer']));
        break;
    case 'question':
        die(question());
        break;
    case 'ping':
        die(ping());
        break;
    case 'badges':
        die(badges($_REQUEST['name']));
        break;
    case 'save_game';
        die(save_game($_REQUEST['💾']));
    case 'backup_s3cr3t_';
        // check_perm(); -> 0ctf/tctf final: Disabled this
        die(backup_s3cr3t_($_REQUEST['🗃'],$_REQUEST['backup_key']));
    default:
        break;
}

?>