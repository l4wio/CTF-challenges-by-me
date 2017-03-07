<!DOCTYPE html>
<html lang="en">
<head>

  <!-- Basic Page Needs
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
  <meta charset="utf-8">
  <title>cURL online</title>
  <meta name="description" content="">
  <meta name="author" content="">

  <!-- Mobile Specific Metas
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- FONT
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
  <link href="//fonts.googleapis.com/css?family=Raleway:400,300,600" rel="stylesheet" type="text/css">

  <!-- CSS
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/skeleton.css">

  <!-- Favicon
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
  <link rel="icon" type="image/png" href="images/favicon.png">

</head>
<body>
  <!-- Primary Page Layout
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
  <div class="container">
    <div class="row">
      <div class="value-props row" style="margin-top: 25%">
        <h4>cURL online</h4>
        <form method='post' action='?'>
                <input class="u-full-width" name="url" type="url" placeholder="http://" id="exampleEmailInput">
                <input class="button-primary" type="submit" value="GO">
        </form>
        <?php
          if (!empty($_POST['url']) && is_string($_POST['url'])){
            if(!filter_var($_POST['url'], FILTER_VALIDATE_URL) === false  && substr($_POST['url'],0,7) === "http://"){
              $url = strtolower(escapeshellarg($_POST['url']));
              $ret = `curl -v $url 2>&1`;
              echo "<p>URL: ".$url."</p>";
              file_put_contents("_____l0g.txt","{$_SERVER['REMOTE_ADDR']} = $url\r\n", FILE_APPEND | LOCK_EX);
              if( !preg_match('/(\.localhost|%|flag)/is',$url,$matches) && !preg_match("/(Connected.*\(127\..*?\))/is",$ret,$matches)) {
                echo "<br /><pre>$ret</pre>";
              } else {
                echo "<font color=Red>Hacker detected [{$matches[1]}]!</font>";
              }
            } else {
              echo "<font color=Red>Invalid URL!</font>";
            }
          }

        ?>

      </div>
    </div>
  </div>

<!--
// flag.php
$ip = $_SERVER['REMOTE_ADDR'];
echo $ip."\n";
if($ip === '127.0.0.1' || $ip === '::1') echo "SVATTT{XXX}";
-->
<!-- End Document
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
</body>
</html>
