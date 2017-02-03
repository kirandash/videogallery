$(document).ready(function(){
	$('a.videoLink').each(function(){
		var thumbnailPath = 'video/'+$(this).attr('videofile')+'.jpg';
		var videoCaption = $(this).attr('videocaption');

		$(this).css('background-image', 'url('+ thumbnailPath +')');
		$(this).html('<div class="caption">'+videoCaption+'</div><img src="images/play_icon.png" class="play"/>')
	});

	$('.videoLink').click(function(){
		var videoFile = $(this).attr('videofile');
		var videoPoster = $(this).attr('videofile');
		var videoWidth = Number($(this).attr('videowidth'));
		var videoHeight = Number($(this).attr('videoheight'));

		// Entire Video code with mp4 ogg and flash player code
		var videoCode = '<video width="'+videoWidth+'" height="'+videoHeight+'" controls autoplay autobuffer><source src="video/'+videoFile+'.ogv" type="video/ogg" /><source src="video/'+videoFile+'.mp4" type="video/mp4" /><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="'+videoWidth+'" height="'+(videoHeight+40)+'" id="lynda_video_player" align="middle"><param name="allowScriptAccess" value="sameDomain"><param name="allowFullScreen" value="true"><param name="movie" value="lynda_video_player.swf?videoFile=video/'+videoFile+'.mp4&amp;skinFile=lynda_video_skin.swf&amp;videoFileWidth='+videoWidth+'&amp;videoFileHeight='+videoHeight+'"><param name="quality" value="high"><param name="wmode" value="transparent"><param name="scale" value="noscale"><param name="salign" value="lt"><embed src="lynda_video_player.swf?videoFile=video/'+videoFile+'.mp4&amp;skinFile=lynda_video_skin.swf&amp;videoFileWidth='+videoWidth+'&amp;videoFileHeight='+videoHeight+'" quality="high" width="'+videoWidth+'" height="'+(videoHeight+40)+'" name="lynda_video_player" align="middle" allowscriptaccess="sameDomain" type="application/x-shockwave-flash" scale="noscale" salign="lt" wmode="transparent" allowfullscreen="true" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed></object></video>';
		
		// Add the entire code to html
		$('#videoPlayer').html(videoCode);
		
		// Add the entire code to fancybox
		$.fancybox({
			'transitionIn' : 'fade',
			'transitionOut' : 'fade',
			'overlayColor' : '#000',
			'overlayOpacity' : '.6',
			'href' : '#videoPlayer' /* Important */
		});

		// Option 1 - Activate video tag for Android
		/*var checkBrowser = navigator.userAgent.toLowerCase();
		var isAndroid = checkBrowser.indexOf('android') > -1; // If useragent has android in it
		
		if(isAndroid) {
			// Remove the codec video of mp4 and play the video when clicked on fancybox
			$('#videoPlayer source[type*="video/mp4"]').removeAttr('type');
			$('#videoPlayer video').attr('onclick','this.play();');
		}*/

		// Option 2 - Detect for both Android, iPhone and iPod, and redirect to video
		var checkBrowser = navigator.userAgent.toLowerCase();
		var isAndroid = checkBrowser.indexOf('android') > -1;
		var isiPhone = checkBrowser.indexOf('iphone') > -1;
		var isiPod = checkBrowser.indexOf('ipod') > -1;
		
		if( isAndroid || isiPhone || isiPod ){
			// Relocating the video directly bypassing the fancybox - BETTER option
			window.location = 'video/'+videoFile+'.mp4';
		}else{
			$.fancybox({
			'transitionIn' : 'fade',
			'transitionOut' : 'fade',
			'href' : '#videoPlayer'
			});
		}		

	});
});