<script nonce='<?=$nonce?>'>

	var INSTAGRAM_REGEX = /^[\w-.]{10,15}$/;
	var params = new URLSearchParams(location.search);
	var ID = params.get('embed');

	if(INSTAGRAM_REGEX.test(ID)){
		var div = document.createElement('div');
		div.innerHTML = `<iframe width=300 height=390 src="https://dummy" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`; // dummy object
		div.firstElementChild.src = 'https://www.instagram.com/p/'+ID+'/embed/captioned/';
		document.write(div.innerHTML);
	}
	
</script>