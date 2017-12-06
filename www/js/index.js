/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
var myApp = new Framework7({
	
	showBarsOnPageScrollEnd: false,
	animateNavBackIcon: true,
    precompileTemplates: true, //
    template7Pages: true, //enable Template7 rendering for pages
	reloadPages: true
	
})

var loggedin = false;
var uploadID = Math.floor(Math.random() * 9000000000) + 1000000000;	

var videouploaded = "false";
var imguploaded = "false";
var player;
var jsonArray = [];

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true,
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
	
    console.log("Device is ready!");	
	//loggedin = "false";
});

//document.addEventListener("offline", function(){ myApp.alert("An internet connection is required.") }, false);

<!--QUICK LIST OF FUNCTIONS-->
/*thankYou()
regView(videoip)
launchVideo(vidtoplay)
RemoveOldPlayer()
loginUserRegistration()
loginUser()
UploadthankYou()
sendVideo()
sendImage()
publishVideo()*/
<!--QUICK LIST OF FUNCTIONS-->

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var navbar = e.detail.navbar;
	var page = e.detail.page;
	VideoCheck();
	
	if (page.name === 'login-tpl')
	{
		
			  $("#inner-login").click(function(){
				  
				  loginUser();
				  
				 }); 
		
	}
	
	if (page.name === 'home-tpl')
	{
		$("#home-login").click(function(){
				  
			loginUser();
				  
		}); 	
	}
	
		
	if (page.name === 'signup-tpl') {
		
		
		$("#register-button").click(function(){


		var email = $("#email").val();
		var fullname = $("#fullname").val();
		var username = $("#username").val();
		var password = $("#password").val();
				
		$.ajax({  
		
			type: 'POST',  
			url: 'http://www.zambezitube.tv/signup.php',
			//url: 'php/signup.php', 
			data: { email: email, fullname: fullname,  username: username, password: password },
			beforeSend: function(XMLHttpRequest)
			{
				 var xhr = new window.XMLHttpRequest();
			  //Upload progress
			  xhr.upload.addEventListener("progress", function(evt){
				if (evt.lengthComputable) {  
				  var percentComplete = evt.loaded / evt.total;
				  //Do something with upload progress
				  console.log('registering person...'+percentComplete);
				}
			  }, false); 
			  return xhr;
			  //Download progress
			  /* XMLHttpRequest.addEventListener("progress", function(evt){
				if (evt.lengthComputable) {  
				  var percentComplete = evt.loaded / evt.total;
				  //Do something with download progress
				  console.log('');
				}
			  }, false);*/ 
			},
			success: function(response) {
				if(response=="success")
				{
					
					myApp.alert('REGISTRATION SUCCESSFUL!');
				  	thankYou();	
				
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				
					myApp.alert("Error..."+errorThrown);
			}
			
		});
	
}); 

    }
	
	
	
	if (page.name === 'upload-tpl') {
		
			
		// Define a div wrapper for the view. The div wrapper is used to attach events.
		this.el = $('<div/>');
		var btn = document.getElementById('nxt-button');
		videouploaded=false;
		imguploaded=false;
		
		$("#pub-btn").hide();
		
		if (loggedin == false)
		{
			loginUserRegistration();
		}
		

		
	}
	
	    if (page.name === 'videosmain-tpl') {
			
			
		  
			$.ajax({
			type: 'POST',
			url: 'http://www.zambezitube.tv/get_json.php',
			//url: 'php/get_json.php',
			data: 'id=testdata',
			dataType: 'json',
			cache: false,
			error: function(XMLHttpRequest, textStatus, errorThrown){
					
				},
			success: function(data){
				
				$.each(data.items, function (n, val){
				
		  
				  var videolink = data.items[n].ID;
				  var videotitle = data.items[n].title;
				  var videodesc = data.items[n].brief;
				  var videopath = "http://www.zambezitube.tv/videos/";
				  
				  var videodata = data.items[n].ID+','+data.items[n].title;
				  jsonArray.push(
				  
				  {sources:[{src: videopath+videolink+'.mp4',type: 'video/mp4'}], thumbnail: videopath+videolink+'.jpg', name:videotitle, description:videodesc}
				  
				  
				  
				  );
				
					});
					if (player != null)
					{
						RemoveOldPlayer();
					}else{
						InitVideoPlayer(jsonArray);
					}
					
				}	
				
			})
		
		}
})

	
myApp.onPageReinit('upload-tpl', function(page){
			
		// Define a div wrapper for the view. The div wrapper is used to attach events.
		this.el = $('<div/>');
		var btn = document.getElementById('nxt-button');
		videouploaded=false;
		imguploaded=false;
		$("#pub-btn").hide();
		
		if (loggedin == false)
		{
			loginUserRegistration();
		}
	
	});

$("#main-login").click(function(){
				  
loginUser();
				  
}); 

/*$("#video").click(function(){
				  
				  console.log('I have clicked the video player in order to pause it...');
myApp.alert('clicked...');
				  
}); */


/*$( '.videobutton' ).on('touchstart', function(){
      
	  myApp.alert('clicked...');

   });*/
		
/*$( '#video' ).on('touchstart', function(){
	
	 myApp.alert('clicked...');
      if (player.userActive() === true) 
      {
		 myApp.alert('PAUSE'); 
        player.userActive(false);
      } 
      else 
      {
		  myApp.alert('NO PAUSE');
        player.userActive(true);
      }
   });*/

function publishVideo()
{
	
	
  var videoid = uploadID;
  
  var videotitle = $("#videotitle").val();
  var videofile = $("#videofile").val();
  var videoimg = $("#videoimg").val();
  var videodesc = $("#videodesc").val();
	
	myApp.showPreloader();
	
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
				myApp.hidePreloader();
			}
	
		  }
		}, false);
	
		return xhr;
	  },
	type: 'POST',  
	url: 'http://www.zambezitube.tv/uploadvids.php',
	//url: 'php/uploadvids.php', 
	data: { videoid: videoid, videotitle: videotitle,  videofile: videofile, videoimg: videoimg, videodesc: videodesc },
	success: function(response) {
		if(response=="success")
		{
			myApp.hidePreloader();
			myApp.alert('VIDEO HAS BEEN UPLOADED SUCCESSFULLY!');
			UploadthankYou();
		}
		if(response=="missing")
		{
			myApp.hidePreloader();
			myApp.alert('PLEASE FILL IN A TITLE AND A DESCRIPTION');
		}
	},
	error: function(XMLHttpRequest, textStatus, errorThrown){
			myApp.hidePreloader();
			myApp.alert('THERE WAS AN ERROR PLEASE TRY AGAIN!'+errorThrown);
	}
	
  });
			
}

function sendImage()
{
	var imageid = uploadID;
	var imageData = new FormData();
	imageData.append('imageToUpload', $('#imageToUpload')[0].files[0]);
	imageData.append('imageid', imageid);
	 myApp.showPreloader();
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
			  			myApp.hidePreloader();
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
						imguploaded = "true";
						myApp.alert('IMAGE UPLOADED SUCCESSFULLY!');

				  		}else{
							
						myApp.alert('SOMETHING HAS GONE WRONG!'+data);
					   
					}
					
				if (videouploaded=="true" && imguploaded=="true")
			   	{
					$("#pubbtn").append('<a href="#" class="button button-big button-red cta-btn">PUBLISH YOUR VIDEO NOW!</a>');
					$(".cta-btn").click(function(){

						publishVideo();
					
					});
			   	}
				   
				   $("#imgcont").css({'display':'none'});
			   }
			   
});
	
	
}

function sendVideo()
{
	var videoid = uploadID;
	var videoarray = [videoid];
	
	var formData = new FormData();
	formData.append('fileToUpload', $('#fileToUpload')[0].files[0]);
	formData.append('videoid', videoid);
	myApp.showPreloader();
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
				myApp.hidePreloader();
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
					   myApp.hidePreloader();
						if (data=="success")
						{
							$("#upload-vid").css({'background-color':'#066516'});
							videouploaded = "true";
							
							myApp.alert('VIDEO UPLOADED SUCCESSFULLY!');
							}else{
							myApp.alert('SOMETHING HAS GONE WRONG'+data);
						}
						
					if (videouploaded=="true" && imguploaded=="true")
					{
							$("#pubbtn").append('<a href="#" class="button button-big button-red cta-btn">PUBLISH YOUR VIDEO NOW!</a>');
							$(".cta-btn").click(function(){
		
								publishVideo();
							
							});
					}
	
					   
					   $("#vidcont").css({'display':'none'});
				   }
			   
	});
	
	
}

$(".left-panel-button").click(function(){

	myApp.closePanel();
	//dispose video if it's open
});

function UploadthankYou()
{
	//upload code goes here...
	mainView.router.loadContent($('#thanksvid-tpl').html());
}	

$("#fileToUpload").click(function(){
  videouploaded = "false";
  $("#upload-vid").css({'background-color':'#b61a1a'});
  //$("#pubbtn").css({'display':'none'});
  $("#pubbtn").empty();
});

$("#imageToUpload").click(function(){
	imguploaded = "false";
	$("#upload-img").css({'background-color':'#b61a1a'});
	//$("#pubbtn").css({'display':'none'});
	$("#pubbtn").empty();
});

function loginUser()
{	
    myApp.modalLogin('Please Sign In to continue', function (username, password) {
		
			var username = username;
			var password = password;
			var login = 'login';
			
			$.ajax({
			  type: 'POST',  
			  url: 'http://www.zambezitube.tv/login.php',
			  //url: 'php/login.php', 
			  data: { username: username, password: password, login:login },
			  success: function(response){
				  if(response=="success")
				  {
					  thankYou();
				  }else{
					  myApp.alert("Username And Password Don't Match!");
				  }
			  },
				  error: function(XMLHttpRequest, textStatus, errorThrown){
					  
					  myApp.alert("Error..."+errorThrown);
				  }
			});
		
    });
}

function loginUserRegistration()
{	

	myApp.modalLogin('Please Sign In to continue',
	
	function (username,password)
	{
		//login callback
		var username = username;
		var password = password;
		var login = 'login';
		
		
		$.ajax({
		  type: 'POST',  
		  url: 'http://www.zambezitube.tv/login.php',
		  //url: 'php/login.php', 
		  data: { username: username, password: password, login:login },
		  success: function(response){
			  if(response=="success")
			  {
				  thankYou();
			  }else{
				  myApp.alert("Username And Password Don't Match!");
				  loginUserRegistration();
			  }
		  },
			  error: function(XMLHttpRequest, textStatus, errorThrown){
				  
				  myApp.alert("Error..."+errorThrown);
				  loginUserRegistration();
			  }
		});
	},
	function (username,password)
	{
		//cancel callback
		mainView.router.back();
		
	}
	
	)

}	 

function VideoCheck()
{
	if (player != null)
	{
		ClearVideo();
	}
}
function ClearVideo()
{
	$( ".vjs-playlist" ).empty();//remove all elements from playlist to be re-added later
	videojs('video').reset();
}
function RemoveOldPlayer()
{
	var oldPlayer = player;
	$( ".vjs-playlist" ).empty();//remove all elements from playlist to be re-added later
	videojs('video').dispose();
	
	InitVideoPlayer(jsonArray);
}

function InitVideoPlayer(VideoSource)
{
		
		player = videojs('video');
		
		player.playlist(VideoSource);
		player.playlistUi();
		
		player.on('playlistitem', function() {
			
			var currentID = player.playlist.currentItem();
			$('.vid-heading').text(VideoSource[currentID].name);
			$('.vid-content').text(VideoSource[currentID].description);
						
			myApp.closePanel();		
				
  		});
				
		player.on('ended', function() {
			player.playlist.next();
  		});
}



function launchVideo(vidtoplay)
{
	$("#videomenu").show();
	$("#video-navbar").collapse('hide');
	
	var videodata = vidtoplay;
	var dataresult = videodata.split(",");
	
	mainvideo = dataresult[0] + '.mp4';
	
		regView(dataresult[0]); //send video data to register a view

	var maintitle  = dataresult[1];
	var mainvideo="";
	mainvideo += '<div data-role="page" id="login-form"><div class="container-fluid" style="margin-top:20px;"><div class="row " id="vidlist"><div class="col-xs-12"><ul style="list-style:none; text-align:center; padding:0px;"><li class="vidheading" id="vidtitle">'+maintitle+'</li><li class="vidthumb"><div id="videoholder"><video width="100%" height="auto" controls><source src="http://www.zambezitube.tv/videos/'+mainvideo+'" type="video/mp4"></video></div></li></ul></div></div></div></div>';
	document.getElementById("vidlist").innerHTML = mainvideo;
}


function regView(videoip)
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

/*
$(".button-content").click(function(event){
	
	 //$('.bottom-button iframe').removeClass('active-state');
	 $(".button-content").children().removeClass('active-state');
	 $(".button-content").removeClass('active-state');
	 $(".button-content").children("span").animate({opacity: '0'},"fast");
	 $(this).children().animate({font: '250px'});
	 $(this).addClass('active-state');
	 $(this).children().addClass('active-state');
	  $(this).children().animate({opacity: '1'},"fast");

	
}); 

$("#profile-button").click(function(){

	 $(".button-content").children().removeClass('active-state');
	 $(".button-content").removeClass('active-state');
	 $(".button-content").children("span").animate({opacity: '0'},"fast");
	 $("#register").children().animate({font: '250px'});
	 $("#register").addClass('active-state');
	 $("#register").children().addClass('active-state');
	 $("#register").children().animate({opacity: '1'},"fast");
	
}); 
$(".back-button").click(function(){

	 $(".button-content").children().removeClass('active-state');
	 $(".button-content").removeClass('active-state');
	 $(".button-content").children("span").animate({opacity: '0'},"fast");
	
}); */
$("#exitbtn").click(function(){

	navigator.app.exitApp();
	
}); 

function thankYou()
{
	loggedin = true;
	mainView.router.loadContent($('#thankyou-tpl').html());
}

//myApp.popup('.popup-terms');