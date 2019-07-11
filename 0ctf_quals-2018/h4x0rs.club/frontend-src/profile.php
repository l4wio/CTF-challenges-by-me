<?php
define('h4x0r_index',1);
include('config.php');
define('csp_policy',2);
include('header.php');

if(!is_login())
    die(header("Location: $ROOT_URL?msg=Please%20login"));


if(@$_POST['submit']){
    $bio = trim($_POST['bio']);
    $visible_bio = (bool)$_POST['visible_bio'];
    if(change_bio($bio,$visible_bio)){
        $_SESSION['biography'] = $bio;
        $_SESSION['visible_bio'] = $visible_bio;
        alert('Your biography is updated successfully','profile.php');
    } else {
        alert('Something went wrong','profile.php');
    }
}

?>
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
                                        <h1 class="text-center font-weight-fat reduce-font-size-sm h2" id="challenge-info-title"><?=$_SESSION['username']?></h1>
                                    </div>
                                    <div class="col hide-sm text-center"><img src="<?=$ROOT_URL?>images/Pokeball2.gif" height=50 width=50></div>
                                </div>
                                <center>
                                <div id="challenge-info-content">
                                <h3>Level</h3>
                                <p><?=$_SESSION['level']?></p>
                                <p><?=($_SESSION['premium']>0)?'<i class="icon ion-star"></i> PREMIUM USER <i class="icon ion-star"></i>':'NORMAL USER AKA. UNPAID USER'?></p>
                                <form method="post" action="<?=$ROOT_URL?>profile.php" id="change-frm" class="validate" novalidate>
                                <h3>Biography</h3> <!-- notice: this function is disabled on admin account for security reason --> 
                                <textarea  name=bio rows=5 cols=30><?=$_SESSION['biography']?></textarea>
                                <br /><br />
                                <input type="radio" id="choice1" name="visible_bio" value="1" <?=(@$_SESSION['visible_bio'] == 1)?'checked="checked"':''?>><label for="choice1">Public</label>
                                <input type="radio" id="choice2" name="visible_bio" value="0" <?=(@$_SESSION['visible_bio'] == 0)?'checked="checked"':''?>><label for="choice2">Private</label>
                                <br /><br />
                                <input type="submit" value="change" name="submit" id="change-btn" class="button button--screen">
                                </form>
                                </div>
                                
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
    <script nonce='<?=$nonce?>' src="<?=$ROOT_URL?>javascripts/app.js"></script>
<?php include('footer.php'); ?>
    <script nonce='<?=$nonce?>'>
        $(".challenge-running").hide();
        $(".challenge-info").show();
    </script>

</body>

</html>
