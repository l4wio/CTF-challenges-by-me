<?php
define('h4x0r_index',1);
include('config.php');
include('header.php');

?>

<!-- Main -->
<section id="main">
    <div class="inner">

        <div class="wrapper style1">
            <div class="content">
                <!-- Elements -->
                <!-- <h2 id="elements">New post </h2> -->
                <div class="row 200%">
                    <div class="12u 12u$(medium)">

                        <!-- Form -->
                        <form method="post" action="create.php" enctype="multipart/form-data">
                            <?=file_get_contents('animated.html')?>
                                <div class="row uniform">
                                    <div class="4u 12u$(xsmall)"></div>
                                    <div class="4u 12u$(xsmall)">
                                        <input spellcheck="false" type="text" name="title" id="title" value="" placeholder="📝 Title" />
                                    </div>
                                    <div class="4u 12u$(xsmall)"></div>
                                    <!-- Break -->
                                    <div class="12u$">
                                        <textarea spellcheck="false" name="pad" id="pad" placeholder="✒️ Write anything you want! I will keep it secret 🙊" rows="6"></textarea>
                                    </div>
                                    <!-- Break -->

                                    <!-- Break -->
                                    <div class="6u 12u$(medium)">

                                        <ul class="actions">
                                            <li><input class="button special" name=submit type="submit" value="NEW POST" /></li>
                                        </ul>
                                    </div>
                                    <div class="6u 12u$(medium)">
                                        <input id=file type=file name=image rows=6 class="inputfile" />
                                        <label for="file"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg> <span>UPLOAD AN FEATURE IMAGE</span></label>
                                        <p>Example: <a href='https://h4x0rs.space/blog/blog.php/91be595c592d5d781caa196f6a64d361af25f7ac8449a2818149355139350faf'>Landscape</a> <a href='https://h4x0rs.space/blog/blog.php/3a8bd0b1f8e21f46bab3a5758c547e10bfe758e56be53ce3b5638b4424f4b061'>moar meow</a>

                                    </div>
                                </div>
                        </form>
                    </div>
                </div>
                <br />
                <hr />
                <h2 id="elements">Report</h2>
                <div class="row 200%">
                    <div class="12u 12u$(medium)">
                        <p>This is BETA version.<br />Please send us a blog post ID where you think something might go wrong. We will check it out for sure.<br />Thank you for your help!</p>
                        <!-- Form -->
                        <form id=report_form method="post" action="#">
                            <div class="row uniform">
                                <div class="8u 12u$(xsmall)">
                                    <input spellcheck="false" type="text" name="id" id="id" value="" placeholder="🔧 Please put blog id here" />
                                </div>
                                <div class="8u 12u$(xsmall)">
                                    <div class="g-recaptcha" data-sitekey="6LfJiEsUAAAAAJxNtFJMHmsIF1RVGnt4pODFDSDf"></div>
                                </div>
                                <!-- Break -->
                                <div class="12u$">
                                    <ul class="actions">
                                        <li><input class="button special" name=submit type="submit" value="SEND" /></li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- Footer -->
<?php require('footer.php'); ?>
</body>
<script nonce='<?=$nonce?>' src='https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js'></script>
<script nonce='<?=$nonce?>' src='<?=$ROOT_URL?>assets/js/index.js'></script>
<script nonce='<?=$nonce?>'>
    document.getElementById("report_form").addEventListener('submit', go_report);
	function go_report(event) {
		event.preventDefault();
	  	var http = new XMLHttpRequest();
		var url = "report.php";
		var params = "id="+escape(document.getElementById('id').value)+"&recaptcha="+escape(grecaptcha.getResponse())+"&submit=SEND";
		http.open("POST", url, true);
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http.onreadystatechange = function() {
		    if(http.readyState == 4 && http.status == 200) {
		        var res = JSON.parse(http.responseText);
		        if(res.status == false){
		        	alert(res.msg || "This blog ID doesn't exist.");
		        }
		        else
		        	alert("OK! Notice that I will take less than 10 seconds on this.\nThanks for your help!");

		        location.reload();
		    }
		}
		http.send(params);
	}
</script>

</html>
