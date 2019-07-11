<?php
define('h4x0r_index',1);
include('config.php');

$pad_id = substr($_SERVER['PATH_INFO'],1);
if(!preg_match('/^[a-f0-9]{64}$/is',$pad_id))
	die(header("Location: {$ROOT_URL}"));

// /* GET PAD */
// $pad = open_pad($pad_id);

// if(!empty($pad['image_type']))
// 	$image_url = $ROOT_URL."untrusted_files/{$pad['id']}.{$pad['image_type']}";
// else
// 	$image_url = '';

/* GET PAD */

include('header.php');
?>
    <style nonce='<?=$nonce?>'>
        .raw_data{display: none;}
    </style>
    <!-- Main -->
    <section id="main">
        <div class="inner">
            <div class="wrapper style1">
                <div class="image fit flush">
                    <img class=feature_image id=feature_image src="" alt="">
                </div>
                <div class="content">

                    <div class="row 100%">
                        <div class="12u 12u$(medium)">
                            <div class="output" id=output></div>

                            <!-- DEBUG 
									<hr />
									<h4 id="elements">Raw</h4>
									<style nonce='<?=$nonce?>'>
										.raw_data{display: block;}	
									</style>
								-->
                            <textarea id=input spellcheck="false" class='raw_data'></textarea>
<script nonce='<?=$nonce?>'>
    var iframes_delayed = [];
	function render(pad) {
		if(!pad){
			document.getElementById('title_blog').innerText = ":(";
			document.getElementById('output').innerText = "This post is not available";
			return;
		}
		document.title = pad.title + " |  "+document.title;
		document.getElementById('title_blog').innerText = pad.title;
		if(pad['image_type']) document.getElementById('feature_image').src = '<?=$ROOT_URL?>untrusted_files/'+pad['id']+'.'+pad['image_type'];
		let data = atob(pad.data);
		// Start rendering
		let o = document.getElementById('output');
		let i = document.getElementById('input');
		i.textContent = data;
		let tmp = o.innerText = data;

		var REGEXP_URLS = [ 
			
			{'name':'h1','re':/\[h1\]([^\[\]\/]*?)\[\/h1\]/g}, 
			{'name':'h2','re':/\[h2\]([^\[\]\/]*?)\[\/h2\]/g}, 
			{'name':'h3','re':/\[h3\]([^\[\]\/]*?)\[\/h3\]/g}, 
			{'name':'li','re':/\[li\]([^\[\]\/]*?)\[\/li\]/g}, 
			{'name':'p','re':/\[p\]([^\[\]\/]*?)\[\/p\]/g}, 
			{'name':'hr','re':/\[hr\]/g},
			{'name':'br','re':/\[br\]/g},  
			{'name':'img','re':/\[img\]([^\[\]]*?)\[\/img\]/g}, 
			{'name':'a','re':/\[a\]([^\[\]]*?)\[\/a\]/g}, 
			{'name':'youtube','re':/\[yt\]([^\[\]\/]*?)\[\/yt\]/g},
			{'name':'instagram','re':/\[ig\]([^\[\]\/]*?)\[\/ig\]/g}, 
			// ... implementing
			];
		
		REGEXP_URLS.forEach((e) => {
		while ((found = e['re'].exec(tmp)) !== null) {
			switch(e['name']){
				case 'h1':
				case 'h2':
				case 'h3':
				case 'li':
				case 'p':
					var f = document.createElement(e['name']);
					f.innerText = found[1];
					o.innerHTML = o.innerHTML.replace(found[0],f.outerHTML);
					break;
				case 'hr':
				case 'br':
					var f = document.createElement(e['name']);
					o.innerHTML = o.innerHTML.replace(found[0],f.outerHTML);
					break;
				case 'a':
					var f = document.createElement('a');
					f.innerText = f.href = found[1];
					o.innerHTML = o.innerHTML.replace(found[0],f.outerHTML);
					break;
				case 'img':
					var f = document.createElement('img');
					f.src = found[1];
					o.innerHTML = o.innerHTML.replace(found[0],f.outerHTML);
					break;
				case 'youtube':
				case 'instagram':
					var dummy = document.createElement('div');
					dummy.innerHTML = `<iframe width="0" height="0" src="" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`; // dummy object since f.frameborder=0 doesn't work.
					var f = dummy.firstElementChild;
					var base = '<?=$ROOT_URL?>untrusted_files/embed/embed.php';
					if(e['name'] == 'youtube'){
						f.width = 500;
						f.height = 330;
						f.src = base+'?embed='+found[1]+'&p=youtube';
					} else if(e['name'] == 'instagram') {
						f.width = 350;
						f.height = 420;
						f.src = base+'?embed='+found[1]+'&p=instagram';
					}
					var d_iframe = document.createElement('div');
					d_iframe.id = 'embed'+iframes_delayed.length; // loading iframe at same time may cause overload. delay it.
					iframes_delayed.push( document.createElement('div').appendChild(f).parentElement.innerHTML /* hotfix: to get iframe html  */ );
					o.innerHTML = o.innerHTML.replace( found[0], d_iframe.outerHTML );
					break;
				default:
					break;
			}
		}
		});
		for(var nf = 0; nf < iframes_delayed.length; nf++) {
			(function (x){
				setTimeout(function (){
					var _f = iframes_delayed[x];
					document.getElementById('embed'+x).innerHTML = _f;	
				},200*nf);
			})(nf);
		}
	}
</script>
<script nonce='<?=$nonce?>' src='<?=$ROOT_URL?>pad.php?callback=render&id=<?=$pad_id?>'></script>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

<!-- Footer -->
<?php require('footer.php'); ?>
</body>

</html>
