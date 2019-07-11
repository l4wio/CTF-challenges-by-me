var API_KEY = "0bc2de3ffce16bcd0e98b00f75dbdff4c1a69eb7d1da85de5bc4c23c46b564d7";
var GAMESERVER_ORIGIN = "https://backend.h4x0rs.club";
var CLIENT_GAME = {

    challenge:"",choices:"",
    callback: undefined,
    ready: undefined,
    csrf: undefined,
    PING_TIMES: 0,
    PING_INTERVAL: undefined,
    badges_ready: undefined,

    _Error: function(s){
        console.log('Client game crashed: '+s);
        // location.reload();
    },

    ping: function(cb) {
        game_server.postMessage({
            'API_KEY': API_KEY,
            'TOKEN': TOKEN,
            'cmd': 'ping'
        },'*');
        if( CLIENT_GAME.PING_TIMES++ == 3){
            // the game is stable now.
            clearInterval(CLIENT_GAME.PING_INTERVAL);
        }
        if(cb) CLIENT_GAME.callback = cb;
    },

    question: function(cb){
        game_server.postMessage({
            'API_KEY': API_KEY,
            'TOKEN': TOKEN,
            'cmd': 'question'
        },'*');
        if(cb) CLIENT_GAME.callback = cb;
    },

    answer: function(cb,a){
        game_server.postMessage({
            'API_KEY': API_KEY,
            'TOKEN': TOKEN,
            'cmd': 'answer',
            'data': a,
        },'*');
        if(cb) CLIENT_GAME.callback = cb;
    },

    badges: function(cb){
        game_server.postMessage({
            'API_KEY': API_KEY,
            'TOKEN': TOKEN,
            'cmd': 'badges',
            'level': LEVEL,
            'title': USERNAME+' got badge: '
        },'*');
        if(cb) CLIENT_GAME.callback = cb;
    },

    recvmsg: function (e) {
        var data = e.data;
        if(e.origin != GAMESERVER_ORIGIN) return CLIENT_GAME._Error("Anti-cheat");
        if(data.result == -1) return CLIENT_GAME._Error("Invalid token");
        if(!('TOKEN' in data) || !('cmd' in data)){
            return CLIENT_GAME._Error('Token is not found');
        }
        if(data.TOKEN != TOKEN) return CLIENT_GAME._Error('Token is invalid');
        switch(data.cmd){
            case 'reload':
                location.reload();
                break;
            case 'answer':
                if(data.result != 1)
                    CLIENT_GAME.callback(0);//wrong
                else
                    CLIENT_GAME.callback(1);//correct
                break;
            case 'question':
                if(data.result != 1){
                    return CLIENT_GAME._Error('question');
                }
                $("#challenge-box").html('<div class="col-12" style="font-size: 2em;"><marquee direction="down" width="800" height="200" behavior="alternate" style="border:none"><pre style="color:#fff;font-size: 0.3em;">'+atob(data.challenge)+'</pre></marquee><br />\nWho\'s That Pokémon?\n<pre style="color:#fff">'+atob(data.choices)+'</pre></div>');
                $("#challenge-box").append($("<div id='mc_embed_signup_scroll'><input type=text style='text-align:center' class='input mr-1 mb-md-3' id=answer placeholder='Type his/her name here'/></div>"));

                break;
            case 'badges':
                if(data.result != 1){
                    return CLIENT_GAME._Error('badges');
                }


                var hex = atob(data.data),bytes = [],image_b64;
                for(var i=0; i< hex.length-1; i+=2){
                    bytes.push(parseInt(hex.substr(i, 2), 16));
                }
                image_b64 = btoa(String.fromCharCode.apply(String, bytes));
                $('#badges').append($("<span class='ml-2 mt-1 text-small-on-sm'><img title='"+data.title+"' src='data:image/png;base64,"+image_b64+"' /></span>"));
                // recv question from server
                CLIENT_GAME.badges_ready = true;
                break;
            case 'pong':
                if(data.result != 1){
                    return CLIENT_GAME._Error('PING failed');
                }
                CLIENT_GAME.ready = true;
                if(CLIENT_GAME.badges_ready != true) window.setTimeout(CLIENT_GAME.badges,1000);
                console.log("PING: OK");
                break;
            default:
                throw `Command ${data.cmd} doesn't exist`;
                break;
        }
    },

    init: function() {
        if(!game_server) return CLIENT_GAME._Error('Something went wrong!');
        window.addEventListener("message", this.recvmsg, false);
        window.setTimeout(this.ping,1000);
        CLIENT_GAME.PING_INTERVAL = window.setInterval(this.ping,3000);
    }
}


$( document ).ready(function() {
    CLIENT_GAME.init();
    $('#play-stop-btn').hide();
    var p = setInterval(function(){
        if(CLIENT_GAME.ready == true) (clearInterval(p), $('#play-stop-btn').show());
    },500)
;    setTimeout(function(){$('.js-difficulty').children().click();},1000);
});

