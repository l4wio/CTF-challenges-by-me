<?php
define('h4x0r_index',1);
include('config.php');
include('header.php');
captcha();
?>
<body>

    <div class="row no-gutters layout__container">
        <div class="col-12 order-2 col-md-5 order-md-1 col-lg-4 layout__control-panel">
            <div class="row no-gutters">
                <div class="col-12 order-2 order-md-1 p-2 pb-3 layout__control-panel__display">
                    <div class="panel panel--purple panel--raised h-100">
                        <div class="screen d-flex align-items-center flex-column justify-content-center">
                            <div class="scrolling-content d-flex flex-column justify-content-top pt-2">
                                <div class="row no-gutters align-items-center panel-heading">
                                    <div class="col-md-4 col-lg-3 text-right text-center-on-sm"><img src="<?=$ROOT_URL?>images/Pokeball.png" width="50" height="50" class="img-fluid illo workoutman--still"></div><img src="<?=$ROOT_URL?>images/Pokeball.png" width="50" height="50" class="img-fluid illo workoutman--animated" style="display: none">
                                    <div class="col text-left text-center-on-sm mb-4 mb-md-1 reduce-font-size-sm">
                                        <h5 class="panel-heading__title font-weight-fat reduce-font-size-sm">&nbsp;&nbsp;h4x0rs.club</h5>
                                    </div>
                                </div>
                                <div class="px-3"><small><p>Who's that pokémon? is the game everybody knows, isn't it ?</p><ol><li>Hit Play <i class="icon ion-play"></i></li><li>Guess pokémon name</li><li>Answer</li></ol></small></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 order-1 order-md-2 p-2 pb-3 layout__control-panel__controls">
                    <div class="panel panel--purple panel--raised h-100">
                        <div class="d-flex flex-column">
                            <div class="order-3 order-md-1">
                                <div class="button-group grow mb-2">
                                    <div class="button button--small button--blue js-difficulty d-flex justify-content-center align-items-center" id="easy" data-difficulty="easy" ><span class="button__text d-none d-sm-inline-block">Easy</span> <span class="button__text d-sm-none">E</span></div>
                                    <div class="button button--small button--blue js-difficulty d-flex justify-content-center align-items-center"
                                        id="medium" data-difficulty="medium" ><span class="button__text d-none d-sm-block">Medium</span> <span class="button__text d-sm-none">M</span></div>
                                    <div class="button button--small button--blue js-difficulty d-flex justify-content-center align-items-center"
                                        id="hard" data-difficulty="hard" ><span class="button__text d-none d-sm-block">Hard</span> <span class="button__text d-sm-none">H</span></div>

                                </div>
                                <div class="button-group grow mb-2">
                                    <?php if(is_login()) { ?>
                                    <div class="button button--small button--yellow d-flex justify-content-center align-items-center" id="logout-button" ><span class="button__text"><span>Log out&nbsp;&nbsp;</span><i class="icon ion-log-out"></i></span></div>
                                    <div class="button button--small button--red d-flex justify-content-center align-items-center" id="profile-button"><span class="button__text"><span>profile&nbsp;&nbsp;</span><i class="icon ion-navicon"></i></span></div>
                                    <?php  } else { ?>
                                    <div class="button button--small button--green d-flex justify-content-center align-items-center" id="home-button"><span class="button__text"><span>home&nbsp;&nbsp;</span><i class="icon ion-home"></i></span></div>
                                    <?php  } ?>
                                    <div class="button button--small button--pink d-flex justify-content-center align-items-center" id="scoreboard-button"><span class="button__text"><span>scoreboard&nbsp;&nbsp;</span><i class="icon ion-connection-bars"></i></span></div>
                                </div>
                                
                            </div>
                            <div
                                class="panel__divider order-2"></div>
                        <div class="order-1 order-md-3">
                            <div class="timer d-flex p mb-3 flex-md-row grow align-items-stretch" id="timer">

                                <div class="timer__display screen d-flex justify-content-center">
                                    <div class="align-self-center font-weight-fat"><span class="minutes">00</span> <span class="colon">:</span> <span class="seconds">10</span></div>
                                </div>
                            </div>
                            <div id="play-stop-btn" class="timer-controls__panel back" style="display:none;">
                                <div class="button-group grow d-flex align-items-stretch">
                                    <div class="button js-start-button grow button--green d-flex justify-content-center align-items-center"  id="play-btn"><span class="button__text"><i class="icon ion-play"></i></span></div>
                                    <div class="button grow button--green d-flex justify-content-center align-items-center selectable" id="twitter-btn"><span class="button__text"><i class="icon ion-social-twitter"></i></span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 order-1 col-md-7 order-md-2 col-lg-8 p-2 pb-3 layout__main-display">
        <div class="panel panel--purple panel--raised h-100">
            <div class="h-100">
                <div class="main-display__screen">
                    <div class="screen">
                        <div class="scrolling-content d-flex flex-column justify-content-top py-3 pl-2 w-100">
                            <div class="screen__scene challenge-countdown my-auto" data-scene-trigger="start-button">
                                <h1 class="text-center big font-weight-fat">3</h1>
                            </div>
                            <div id="challenge-box" class="screen__scene challenge-running" data-scene-trigger="reload-button"><img src="<?=$ROOT_URL?>images/Pikachu.gif" class="mb-4 align-self-center drillinstructor--still" style="display: none"> <img src="<?=$ROOT_URL?>images/Pikachu.gif"
                                    class="mb-4 align-self-center drillinstructor--animated">
                                <div class="talk-bubble text-center">
                                    <div class="talk-bubble__arrow"></div>
                                    <div class="container-fluid">
                                        <div class="row py-3 output">
                                            <div class="col-12 col-sm-4 col-md-12 col-lg-4 text-center text-right-on-sm text-right-on-lg font-weight-fat">intro:</div>
                                            <div class="col-12 col-sm-8 col-md-12 col-lg-8 mb-3 text-center text-left-on-sm text-left-on-lg">
                                                <div id="features" class="output__text"></div>
                                            </div>
                                            <div class="col-12 col-sm-4 col-md-12 col-lg-4 text-center text-right-on-sm text-right-on-lg font-weight-fat">For:</div>
                                            <div class="col-12 col-sm-8 col-md-12 col-lg-8 mb-3 text-center text-left-on-sm text-left-on-lg">
                                                <div id="useCases" class="output__text"></div>
                                            </div>
                                        </div>
                                        <!-- <div class="quote-box"></div> -->
                                    </div>
                                </div>
                            </div>
                            <div class="screen__scene challenge-out-of-time" data-scene-trigger="out-of-time">
                                <h1 class="big font-weight-fat text-center mb-3">Out of time!</h1>
                                <!-- SAD RESPONSE -->
                                <div class="row justify-content-center out-of-time-response" id="response-sad">
                                    <div class="col-sm-8"><img class="mb-4" src="<?=$ROOT_URL?>images/illo-zacjake-53b6a404b8.gif">
                                        <div class="talk-bubble p-3">
                                            <div class="talk-bubble__arrow"></div>
                                            <p class="mb-0">WRONG!</p>
                                        </div>
                                        <!-- <p class="text-center">
        <img src="images/illo-star-bf7ab53af8.gif" width="64">
      </p> -->
                                    </div>
                                </div>
                                <!-- HAPPY RESPONSE -->
                                <div class="row justify-content-center out-of-time-response" id="response-happy">
                                    <div class="col-sm-8"><img class="mb-4" src="<?=$ROOT_URL?>images/illo-zacjake-2-6817798c6e.gif">
                                        <div class="talk-bubble p-3">
                                            <div class="talk-bubble__arrow"></div>
                                            <p class="mb-0">GREAT JOB!</p>
                                        </div>
                                        <p class="text-center"><img src="<?=$ROOT_URL?>images/illo-star-bf7ab53af8.gif" width="64"> <img src="<?=$ROOT_URL?>images/illo-star-bf7ab53af8.gif" width="64"> <img src="<?=$ROOT_URL?>images/illo-star-bf7ab53af8.gif" width="64"></p>
                                    </div>
                                </div>
                            </div>
                            <div class="screen__scene challenge-info px-4" data-scene-trigger="about">
                                <div class="d-flex align-items-center py-3 mt-1 mb-5" style="border: 3px solid #4CF190">
                                    <div class="col hide-sm text-center"><img src="<?=$ROOT_URL?>images/Pikachu.gif" width='50%'></div>
                                    <div class="col">
                                        <h1 class="text-center font-weight-fat reduce-font-size-sm h2" id="challenge-info-title"><?=(@$_GET['msg'])?$_GET['msg']:"JOIN US"?></h1>
                                    </div>
                                    <div class="col hide-sm text-center"><img src="<?=$ROOT_URL?>images/Pikachu.gif" width='50%'></div>
                                </div>
                                <div id="challenge-info-content">
                                <div id="mc_embed_signup" class="mb-5">
                                    <form method="post" id="reglogin-frm" class="validate" target="_blank"
                                        novalidate>
                                        <div id="mc_embed_signup_scroll" class="text-center">
                                            <input type="text" value="" name="username" class="input mr-1 mb-md-3" id="mce-username" placeholder="username" required><br />
                                            <input type="password" value="" name="password" class="input mr-1 mb-md-3" id="mce-password" placeholder="password" required><br />
                                            <input type="submit" value="Register/Login" name="submit" id="mc-reg-login" class="button button--screen"><br />
                                            <hr>
                                            <h5 style='color: #fff;'>Captcha</h5>
                                        	
                                        	<input type="text" class="input mr-1 mb-md-3" placeholder="Enter captcha here" value="" name='captcha' style='text-align: center;'>
                                        	<p><?=$_SESSION['captcha']?></p>
                                        </div>
                                            
                                    </form>
                                </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-display__spacer"></div>
                
                <div class="main-display__made-by">
                    <div class="d-flex flex-column align-items-center badges-text" style='font-size: 0.8em;'>
                        <span>badges</span>
                    </div>
                    <div id="badges" class="flex-column align-items-center" style="text-align: center">
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    </div>
    <!-- hello h4x0rs there, are u bored ? listen to this https://www.youtube.com/watch?v=wDT3xJV3_28 -->
    <script nonce='<?=$nonce?>' src="<?=$ROOT_URL?>javascripts/app.js"></script>
<?php
    include('footer.php');
    if(is_login()) {
?>
    <div style="display:none;"><iframe name="game_server" src="https://backend.h4x0rs.club/backend_www/" frameborder="0" width=0 height=0 /></iframe></div>
    <!-- boring ?! you may want to check this song... https://www.youtube.com/watch?v=wDT3xJV3_28 -->
    <script nonce='<?=$nonce?>'>
        var TOKEN = <?=json_encode($_SESSION['game_token'])?>;
        var LEVEL = <?=$_SESSION['level']?>;
        var USERNAME = <?=json_encode($_SESSION['username'])?>;
        var PREMIUM = <?=$_SESSION['premium']?>; // Contact us to buy premium pack <3
        if(LEVEL != 0) $('#easy').remove();
        if(LEVEL != 1) $('#medium').remove();
        if(LEVEL < 2) $('#hard').remove();
        load_clientjs();
        // $('#tweet-link').attr('href',));
    </script>
<?php
    } else {
?>
    <script nonce='<?=$nonce?>'>
        var LEVEL = -1;
        $('#easy , #medium, #hard').remove();
        $(".challenge-running").hide();
        $(".challenge-info").show();
        $("#reglogin-frm").submit(function(event){
        event.preventDefault();
            $.post('login.php', $( this ).serialize() , function(data){
                if(data.result != 1){
                    alert(data.msg || "Try again");
                }
                
                location.reload();

            });

        });
<?php
    }
?>
    </script>

    
</body>

</html>
