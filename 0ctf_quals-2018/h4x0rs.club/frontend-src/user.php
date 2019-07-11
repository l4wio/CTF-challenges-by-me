<?php
define('h4x0r_index',1);
include('config.php');

if(!is_login())
    die(header("Location: $ROOT_URL?msg=Login+required"));

$username = basename($_SERVER['PHP_SELF']);
if(!preg_match('/^\w{5,16}$/is',$username)){
    die(header("Location: $ROOT_URL?msg=Username+is+invalid"));
}
$row = check_account($username,'',0);
if(!$row) die(header("Location: $ROOT_URL?msg=This+user+does+not+exist"));

captcha();
define('csp_policy',2);
include('header.php');
?>
<!-- This page contains untrusted user input, make CSP rules strict -->
<body>

    <div class="row no-gutters layout__container">

    <div class="col-12 order-2 col-md-7 order-md-2 col-lg-12 p-2 pb-3 layout__main-display">
        <div class="panel panel--purple panel--raised ">
            <div class="h-100">
                <div class="main-display__screen">
                    <div class="screen">
                        <div class="scrolling-content d-flex flex-column justify-content-top py-3 pl-2 w-100">
                            <div class="screen__scene challenge-countdown my-auto" data-scene-trigger="start-button">
                                <h1 class="text-center big font-weight-fat">3</h1>
                            </div>
                            <div class="screen__scene challenge-info px-4" data-scene-trigger="about">
                                <div class="d-flex align-items-center py-3 mt-1 mb-5" style="border: 3px solid #4CF190">
                                    <div class="col hide-sm text-center"><img src="<?=$ROOT_URL?>images/Pokeball2.gif" height=50 width=50></div>
                                    <div class="col">
                                        <h1 class="text-center font-weight-fat reduce-font-size-sm h2" id="challenge-info-title"><?=$row['username']?></h1>
                                    </div>
                                    <div class="col hide-sm text-center"><img src="<?=$ROOT_URL?>images/Pokeball2.gif" height=50 width=50></div>
                                </div>
                                <center>
                                <div id="challenge-info-content">
                                <h3>Level</h3>
                                <p><?=$row['level']?></p>
                                <p><?=($row['premium']>0)?'<i class="icon ion-star"></i> PREMIUM USER <i class="icon ion-star"></i>':'NORMAL USER AKA. UNPAID USER'?></p>
                                <h3>Biography</h3>
                                <p><?=($row['visible_bio']==true)?$row['biography']:'<i class="icon ion-locked"></i> PRIVATE <i class="icon ion-locked"></i>'?></p>
                                </div>
                                <form method="post" action="<?=$ROOT_URL?>do_report.php" id="report-form" class="validate" novalidate>
                                    <div id="mc_embed_signup_scroll" class="text-center">
                                        <img src='<?=$ROOT_URL?>images/Pikachu.gif' width='100' height='100'/>
                                        <h4 style="color:#fff">Report this account</h4>
                                        <p><input type="text" class="input mr-1 mb-md-3" style="width:700px" value="<?php echo $ROOT_URL.'user.php/'.$row['username'] ?>" id=url_report name=url_report></p>
                                        
                                        <input type="submit" value="report" name="submit" id="report-btn" class="button button--screen"><br /><br />
                                        <!-- <input type="text" class="input mr-1 mb-md-3" placeholder="Enter captcha here" value="" name='captcha' style='text-align: center;'> -->
<!--                                         <h5>Captcha</h5> -->
                                        <div class="8u 12u$(xsmall)">
                                            <center><div class="g-recaptcha" data-sitekey="6LfJiEsUAAAAAJxNtFJMHmsIF1RVGnt4pODFDSDf"></div></center>
                                        </div>
                                        
                                    </div>                  
                                </form>

                                </center>


                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-display__spacer"></div>
                <div class="main-display__made-by">
                <div class="button-group grow mb-2">
                <?php if(is_login()) { ?>
                <div class="button button--small button--green d-flex justify-content-center align-items-center" id="home-button" ><span class="button__text"><span>HOME&nbsp;&nbsp;</span><i class="icon ion-home"></i></span></div>
                <div class="button button--small button--yellow d-flex justify-content-center align-items-center" id="logout-button" ><span class="button__text"><span>Log out&nbsp;&nbsp;</span><i class="icon ion-log-out"></i></span></div>
                <div class="button button--small button--red d-flex justify-content-center align-items-center" id="profile-button"><span class="button__text"><span>profile&nbsp;&nbsp;</span><i class="icon ion-navicon"></i></span></div>
                <?php  } ?>
                </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <script nonce='<?=$nonce?>' src='https://www.google.com/recaptcha/api.js'></script>
    <script nonce='<?=$nonce?>' src="<?=$ROOT_URL?>javascripts/app.js"></script>
<?php include('footer.php'); ?>
    <script nonce='<?=$nonce?>'>
        $(".challenge-running").hide();
        $(".challenge-info").show();
        var confirm_report = 0;
        $('#report-form #report-btn').click(function(e){
            if(!confirm_report) e.preventDefault();
            if(!confirm('Are you sure to report this user due to hacking activities?')){
                history.back();
            } else {
                confirm_report = 1;
                $(this).unbind('click').click();
            }
        });

        if(location.hash.slice(1) == 'report'){
            document.getElementById('report-btn').click();
        }

        

    </script>

</body>

</html>
