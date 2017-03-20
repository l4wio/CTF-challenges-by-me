<?php session_start(); ?>
<!DOCTYPE html>
<!--[if lt IE 7]> <html class="lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]> <html class="lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]> <html class="lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="en"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>SecretKeeper v1.0</title>
  <link rel="stylesheet" href="css/style.css">
  <!--[if lt IE 9]><script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
</head>
<body><br /><br /><br />

    <div class="mainform">
      <h1>SecretKeeper v1.0</h1>
        <?php
            
            function strToHex($string)
            {
                $hex='';
                for ($i=0; $i < strlen($string); $i++){
                    $tmp = dechex(ord($string[$i]));
                    $hex .= (strlen($tmp)==1)?"0".$tmp:$tmp;
                }
                return $hex;
            }
            function hexToStr($hex)
            {
                $string='';
                for ($i=0; $i < strlen($hex)-1; $i+=2)
                    $string .= chr(hexdec($hex[$i].$hex[$i+1]));
                return $string;
            }
            //
            // encrypt + decrypt AES
            //
            include("init.php"); // define _KEY,_IV,_SECRET
            // flag in ./secret/flag.php

            function encrypt_($str){
                return strToHex(mcrypt_encrypt(MCRYPT_RIJNDAEL_128, _KEY, $str, MCRYPT_MODE_CBC,_IV));
            }
            function decrypt_($str){
                return rtrim(mcrypt_decrypt(MCRYPT_RIJNDAEL_128, _KEY, hexToStr($str), MCRYPT_MODE_CBC,_IV),"\0");
            }
            function hmac_($msg,$secret){
                return hash_hmac('md5',$msg,$secret);
            }

            if(!empty($_POST['secret']) && is_string($_POST['secret']) && strlen($_POST['secret']) < 1337){
                 $secret_hmac = md5(_SECRET.rand(0,1337),true);
                 $secret_filename = md5(session_id.$secret_hmac);
                 file_put_contents("./secret/".$secret_filename,$_POST['secret']);
                 $secret_link = encrypt_($secret_filename."|".$secret_hmac);
                 echo "<br /><p align='center'><a class='button button-blue' href='?file={$secret_link}&sign=".hmac_($secret_filename,$secret_hmac)."'>Your secret</p></a>";

            }elseif(!empty($_GET['file'])){
                $decrypt = explode("|",decrypt_($_GET['file']));
                $secret_filename = $decrypt[0];
                $secret_hmac = $decrypt[1];
                $hmac_ = $_GET['sign'];
                $error = false;
                if(strlen($secret_hmac) != 16){
                    echo "HMAC: Bad length! (".strlen($secret_hmac).")<br />";
                    $error = true;
                }       
                if(hmac_($secret_filename,$secret_hmac)!==$hmac_){
                    echo "HMAC: Not match!<br />";
                    $error = true;
                }

                
        ?>
                <section class="notepaper">
                    <figure class="quote">
                        <blockquote class="curly-quotes" cite="./secret/<?=$secret_filename?>">
                            <?php
                                if(!$error)
                                    echo file_get_contents("./secret/".basename($secret_filename)); // anti directory traversal
                                else
                                    echo "ERROR!";
                            ?> 

                        </blockquote>
                    </figure>
                </section>
        <?php
            }else{
        ?>
        <form action="?save" method="POST">
            <p><textarea name="secret" rows="10" cols="80" placeholder="Your secret!"></textarea></p>
            <p align="center"><input type="submit" name="confirm" value="Save" class="button button-blue"></p>
        </form>
        <?php
            }
        ?>

    </div>

</body>
</html>
