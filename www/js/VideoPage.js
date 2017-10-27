var VideoPage = function(store) {

    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
  // Initialization work goes here.
  	var videolist, text = "";
	
	

	
				$.ajax({
		type: 'POST',
        url: 'http://www.zambezitube.tv/get_json.php',
		//url: 'php/get_json.php',
        data: 'id=testdata',
        dataType: 'json',
        cache: false,
		error: function(XMLHttpRequest, textStatus, errorThrown){
			
			if (document.getElementById("vidlist"))
			{
				//document.getElementById("vidlist").innerHTML += errortxt;
			}
			
			
			},
		success: function(data){
			
			$.each(data.items, function (n, val){
			
			var videolink = data.items[n].ID;
			var videotitle = data.items[n].title;
			
			var videodata = data.items[n].ID+','+data.items[n].title;
			
			text += '<div class="col-xs-12 vidlist"><ul style="list-style:none; text-align:center; padding:0px;"><li class="vidheading"><button onClick="launchVideo(\'' + videodata + '\')" />'+data.items[n].title+'</button></li><li class="vidthumb"><div class="img-thumbnail"><button onClick="launchVideo(\'' + videodata + '\')"><img src="http://www.zambezitube.tv/videos/'+data.items[n].img+'" width="100%" height="auto" /></button></div></li></ul></div>';
				$("#videomm").append('<li><button onClick="launchVideo(\'' + videodata + '\')">'+data.items[n].title+'</button></li>');
				});
			//\'' + videolink +','+videotitle+ '\'
			document.getElementById("vidlist").innerHTML += text;
			}	
		})
		
    };

    this.render = function() {

        this.el.html(VideoPage.template());
        return this;

    };
		
		
		 launchVideo = function(vidtoplay)
{
	$("#videomenu").show();
	$("#video-navbar").collapse('hide');
	
	var videodata = vidtoplay;
	var dataresult = videodata.split(",");
	
	localStorage.mainvideo = dataresult[0] + '.mp4';
	
		regView(dataresult[0]); //send video data to register a view

	var maintitle  = dataresult[1];
	var mainvideo="";
				mainvideo += '<div data-role="page" id="login-form"><div class="container-fluid" style="margin-top:20px;"><div class="row " id="vidlist"><div class="col-xs-12"><ul style="list-style:none; text-align:center; padding:0px;"><li class="vidheading" id="vidtitle">'+maintitle+'</li><li class="vidthumb"><div id="videoholder"></div></li></ul></div></div></div></div>';
	
	var src = 'http://www.zambezitube.tv/videos/'+localStorage.mainvideo;
	var media = new Media(src);
	
	//localStorage.maintitle = titlemain;
	document.getElementById("vidlist").innerHTML = mainvideo;
}
	
			 regView = function(videoip)
{
			var videoid = videoip;
		$.ajax({  
		
			type: 'POST',  
			url: 'http://www.zambezitube.tv/registerview.php',
			//url: 'php/registerview.php', 
			data: { videoid: videoid},
			success: function(response) {

			},
			
		});
}
		
    this.initialize();

}

VideoPage.template = Handlebars.compile($("#videosmain-tpl").html());
