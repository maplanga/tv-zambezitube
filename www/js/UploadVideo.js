var UploadVideo = function(store) {

    this.initialize = function() {
		
		localStorage.videoid = Math.floor(Math.random() * 9000000000) + 1000000000;	
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
		var btn = document.getElementById('nxt-button');
		localStorage.videouploaded=false;
		localStorage.imguploaded=false;
		
		$("#pub-btn").hide();

		if (this.btn)
		{
			document.getElementById("nxt-button").addEventListener("click", loadNxtPage);

		}
		
    };

    this.render = function() {
        this.el.html(UploadVideo.template());
        return this;
		
    };

   	publishVideo = function() {

		var videoid = localStorage.videoid;
		var videotitle = $("#videotitle").val();
		var videofile = $("#videofile").val();
		var videoimg = $("#videoimg").val();
		var videodesc = $("#videodesc").val();
		$.ajax({  
		
			type: 'POST',  
			url: 'http://www.zambezitube.tv/uploadvids.php',
			//url: 'php/uploadvids.php', 
			data: { videoid: videoid, videotitle: videotitle,  videofile: videofile, videoimg: videoimg, videodesc: videodesc },
			success: function(response) {
			
				if(response=="success")
				{
					alert('VIDEO PUBLISHED SUCCESSFULLY!');
					thankYou();
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				
					alert('THERE WAS AN ERROR PLEASE TRY AGAIN!'+errorThrown);
			}
			
		});

    };
	
	sendImage = function() {
		
				var imageid = localStorage.videoid;
				
        var imageData = new FormData();
		imageData.append('imageToUpload', $('#imageToUpload')[0].files[0]);
		imageData.append('imageid', imageid);
				
$.ajax({
  xhr: function() {
    var xhr = new window.XMLHttpRequest();

    xhr.upload.addEventListener("progress", function(evt) {
      if (evt.lengthComputable) {
        var percentComplete = evt.loaded / evt.total;
        percentComplete = parseInt(percentComplete * 100);
			$("#imgcont").css({'display':'block','background-color':'#900'});
			var percentVal = percentComplete + '%';
            $("#imgprog").width(percentVal);
            $("#imgper").html(percentVal);
			
        if (percentComplete === 100) {

        }

      }
    }, false);

    return xhr;
  },
			   url : 'http://www.zambezitube.tv/upload_image.php',
			   //url : 'php/upload_image.php',
			   type : 'POST',
			   data : imageData,
			   processData: false,  // tell jQuery not to process the data
			   contentType: false,  // tell jQuery not to set contentType
			   success : function(data) {
				   	if (data=="success")
				   	{
						$("#upload-img").css({'background-color':'#066516'});
						localStorage.imguploaded = "true";
						alert('IMAGE UPLOADED SUCCESSFULLY!');

				  		}else{
							
						alert('SOMETHING HAS GONE WRONG!'+data);
					   
					}
					
				if (localStorage.videouploaded=="true" && localStorage.imguploaded=="true")
			   	{
					$("#pubbtn").append('<button class="cta-btn" onclick="publishVideo()">PUBLISH YOUR VIDEO NOW!</button>');
			   	}
				   
				   $("#imgcont").css({'display':'none'});
			   }
			   
});
		

		};
	
	


$(function(){
    $("#fileToUpload").click(function(){
        						localStorage.videouploaded = "false";
				$("#upload-vid").css({'background-color':'#b61a1a'});
				//$("#pubbtn").css({'display':'none'});
				$("#pubbtn").empty();
    });
});

$(function(){
    $("#imageToUpload").click(function(){
        						localStorage.imguploaded = "false";
				$("#upload-img").css({'background-color':'#b61a1a'});
				//$("#pubbtn").css({'display':'none'});
				$("#pubbtn").empty();
    });
});
	   	sendVideo = function() {
		
		var videoid = localStorage.videoid;
		var videoarray = [videoid];
						
        var formData = new FormData();
		formData.append('fileToUpload', $('#fileToUpload')[0].files[0]);
		formData.append('videoid', videoid);
		
$.ajax({
  xhr: function() {
    var xhr = new window.XMLHttpRequest();

    xhr.upload.addEventListener("progress", function(evt) {
      if (evt.lengthComputable) {
        var percentComplete = evt.loaded / evt.total;
        percentComplete = parseInt(percentComplete * 100);
			$("#vidcont").css({'display':'block','background-color':'#900'});
			var percentVal = percentComplete + '%';
            $("#vidprog").width(percentVal);
            $("#vidper").html(percentVal);
			
        if (percentComplete === 100) {

        }

      }
    }, false);

    return xhr;
  },
			   url : 'http://www.zambezitube.tv/upload_video.php',
			   //url : 'php/upload_video.php',
			   type : 'POST',
			   data : formData,
			   processData: false,  // tell jQuery not to process the data
			   contentType: false,  // tell jQuery not to set contentType
			   success : function(data) {
				   
				   	if (data=="success")
				   	{
						$("#upload-vid").css({'background-color':'#066516'});
						localStorage.videouploaded = "true";
						alert('VIDEO UPLOADED SUCCESSFULLY!');
				  		}else{
						alert('SOMETHING HAS GONE WRONG'+data);
					}
					
									if (localStorage.videouploaded=="true" && localStorage.imguploaded=="true")
			   	{
					$("#pubbtn").append('<button class="cta-btn" onclick="publishVideo()">PUBLISH YOUR VIDEO NOW!</button>');
			   	}

				   
				   $("#vidcont").css({'display':'none'});
			   }
		   
});



    };
	
	thankYou = function() {

		var self = this;
		this.store = new MemoryStore(function() {
			$('.main-content').html(new ThanksVideo(self.store).render().el);//load the home div class
		});	

    };
		
		
		//$("#pubbtn").append('<button class="cta-btn" onclick="publishVideo()">PUBLISH YOUR VIDEO NOW!</button>');
		
    this.initialize();

}

UploadVideo.template = Handlebars.compile($("#upload-tpl").html());
