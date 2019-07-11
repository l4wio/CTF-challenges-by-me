    <script nonce='<?=$nonce?>'>
        $('#scoreboard-button').click(function(){
            $.get('/game/scoreboard.php',function(html){
                $(".challenge-running").hide();
                $("#challenge-info-title").text('SCOREBOARD');
                $('#challenge-info-content').html(html);
                $(".challenge-info").show();
            })
        });
        $('#profile-button').click(function(){
            location.href='/game/profile.php';
        });
        $('#logout-button').click(function(){
            location.href='/game/login.php?action=logout';
        });
        $('#home-button').click(function(){
            location.href='/game/?msg=Welcome';
        });
        $('#twitter-btn').click(function(){
            window.open('https://twitter.com/intent/tweet?text='+escape('I got '+LEVEL+' badges. Come to join us! https://h4x0rs.club/game/user.php/'+USERNAME+' #h4rx0rsclub'));
        });
    </script>
