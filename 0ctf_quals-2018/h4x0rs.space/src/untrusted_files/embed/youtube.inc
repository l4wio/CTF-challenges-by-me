<script nonce='<?=$nonce?>'>

	var YOUTUBE_REGEX = /^[\w-.]{4,15}$/;
	var params = new URLSearchParams(location.search);
	var ID = params.get('embed');

	if(YOUTUBE_REGEX.test(ID)){
		var div = document.createElement('div');
		div.innerHTML = `<iframe width="100%" height="95%" src="https://dummy" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`; // dummy object
		div.firstElementChild.src = 'https://www.youtube.com/embed/'+ID;
		document.write(div.innerHTML);
	}
</script>