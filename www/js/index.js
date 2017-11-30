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
	
	hideToolbarOnPageScroll: true,
	animateNavBackIcon: true,
    precompileTemplates: true, //
    template7Pages: true, //enable Template7 rendering for pages
	
})

/*
LOAD PAGE FROM JAVASCRIPT
//To load contacts page from template:
mainView.router.load({
    template: Template7.templates.contactsTemplate // template already compiled and available as a property of Template7.templates
})
 
//To load about page from template with custom data:
mainView.router.load({
    template: Template7.templates.aboutTemplate, // template already compiled and available as a property of Template7.templates
    context: {
        name: 'John Doe',
        age: 35
    }
})

*/


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
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var navbar = e.detail.navbar;
	var page = e.detail.page;

	
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
		
		localStorage.videoid = Math.floor(Math.random() * 9000000000) + 1000000000;	
		// Define a div wrapper for the view. The div wrapper is used to attach events.
		this.el = $('<div/>');
		var btn = document.getElementById('nxt-button');
		localStorage.videouploaded=false;
		localStorage.imguploaded=false;
		
		$("#pub-btn").hide();
		
	}
	
	    if (page.name === 'videosmain-tpl') {
			

			var jsonArray = [];
		  
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
				  //console.log('the video information is...'+videolink);
				  jsonArray.push(
				  
				  {sources:[{src: videopath+videolink+'.mp4',type: 'video/mp4'}], thumbnail: videopath+videolink+'.jpg', name:videotitle, description:videodesc}
				  
				  
				  
				  );
				console.log('I am trying to load...'+ videolink+'.mp4');
				
					});
					
					InitVideoPlayer(jsonArray);
				}	
				
			})
		
		}
})


$("#main-login").click(function(){
				  
loginUser();
				  
}); 


		


function publishVideo()
{
		
  var videoid = localStorage.videoid;
  var videotitle = $("#videotitle").val();
  var videofile = $("#videofile").val();
  var videoimg = $("#videoimg").val();
  var videodesc = $("#videodesc").val();
	
myApp.showPreloader();
  $.ajax({  
  
	type: 'POST',  
	url: 'http://www.zambezitube.tv/uploadvids.php',
	//url: 'php/uploadvids.php', 
	data: { videoid: videoid, videotitle: videotitle,  videofile: videofile, videoimg: videoimg, videodesc: videodesc },
	success: function(response) {
		myApp.hidePreloader();
		if(response=="success")
		{
			myApp.alert('VIDEO HAS BEEN UPLOADED SUCCESSFULLY!');
			UploadthankYou();
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
	var imageid = localStorage.videoid;
		  
	var imageData = new FormData();
	imageData.append('imageToUpload', $('#imageToUpload')[0].files[0]);
	imageData.append('imageid', imageid);
	
				  $.ajax({
				xhr: function() {
				  var xhr = new window.XMLHttpRequest();
			  
				  xhr.upload.addEventListener("progress", function(evt) {
					if (evt.lengthComputable) {
						
					 myApp.showPreloader();
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
				   myApp.hidePreloader();
				   	if (data=="success")
				   	{
						$("#upload-img").css({'background-color':'#066516'});
						localStorage.imguploaded = "true";
						myApp.alert('IMAGE UPLOADED SUCCESSFULLY!'+localStorage.imguploaded);

				  		}else{
							
						myApp.alert('SOMETHING HAS GONE WRONG!'+data);
					   
					}
					
				if (localStorage.videouploaded=="true" && localStorage.imguploaded=="true")
			   	{
					$("#pubbtn").append('<button class="cta-btn" onclick="publishVideo()">PUBLISH YOUR VIDEO NOW!</button>');
			   	}
				   
				   $("#imgcont").css({'display':'none'});
			   }
			   
});
	
	
}

function sendVideo()
{
	var videoid = localStorage.videoid;
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
							localStorage.videouploaded = "true";
							
							myApp.alert('VIDEO UPLOADED SUCCESSFULLY!'+localStorage.videouploaded);
							}else{
							myApp.alert('SOMETHING HAS GONE WRONG'+data);
						}
						
										if (localStorage.videouploaded=="true" && localStorage.imguploaded=="true")
					{
						$("#pubbtn").append('<button class="cta-btn" onclick="publishVideo()">PUBLISH YOUR VIDEO NOW!</button>');
					}
	
					   
					   $("#vidcont").css({'display':'none'});
				   }
			   
	});
	
	
}

/*$(".left-panel-button").click(function(){

	var oldPlayer = document.getElementById('video');

	if (oldPlayer!=null)
	{
		videojs(oldPlayer).dispose();
	}
	
	myApp.closePanel();

});*/

$(".left-panel-button").click(function(){

	var oldPlayer = document.getElementById('video');

	if (oldPlayer!=null)
	{
		videojs(oldPlayer).dispose();
	}
	
	myApp.closePanel();

});

function UploadthankYou()
{
	//upload code goes here...
	mainView.router.loadContent($('#thanksvid-tpl').html());
}	

$("#fileToUpload").click(function(){
  localStorage.videouploaded = "false";
  $("#upload-vid").css({'background-color':'#b61a1a'});
  //$("#pubbtn").css({'display':'none'});
  $("#pubbtn").empty();
});

$("#imageToUpload").click(function(){
	localStorage.imguploaded = "false";
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
		 

function InitVideoPlayer(VideoSource)
{
		//var player = "";
		//var oldPlayer = document.getElementById('video');
		//videojs(oldPlayer).dispose();	
		var player = videojs('video');
			
					//$('.vid-heading').text("new dialog title") = player;
		//$('.vid-content').text("new dialog title");
		
		// Initialize the playlist-ui plugin with no option (i.e. the defaults).
		player.playlistUi();
		
		//console.log('samplePlaylist is...'+sources);
		player.playlist(VideoSource);
		player.playlist.repeat(true);
		
		
		
		player.on('playlistitem', function() {
			var currentID = player.playlist.currentItem();
			$('.vid-heading').text(VideoSource[currentID].name);
			$('.vid-content').text(VideoSource[currentID].description);
			myApp.closePanel();
			//myApp.alert("I am currently playing..."+player.playlist.currentItem());
			
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
	
	localStorage.mainvideo = dataresult[0] + '.mp4';
	
		regView(dataresult[0]); //send video data to register a view

	var maintitle  = dataresult[1];
	var mainvideo="";
	mainvideo += '<div data-role="page" id="login-form"><div class="container-fluid" style="margin-top:20px;"><div class="row " id="vidlist"><div class="col-xs-12"><ul style="list-style:none; text-align:center; padding:0px;"><li class="vidheading" id="vidtitle">'+maintitle+'</li><li class="vidthumb"><div id="videoholder"><video width="100%" height="auto" controls><source src="http://www.zambezitube.tv/videos/'+localStorage.mainvideo+'" type="video/mp4"></video></div></li></ul></div></div></div></div>';
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


$(".button-content").click(function(event){
	
	if (document.getElementById('video') != null)
	{
		var oldPlayer = document.getElementById('video');
		videojs(oldPlayer).dispose();	
	}

		
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
	
}); 
$("#exitbtn").click(function(){

	navigator.app.exitApp();
	
}); 

function thankYou()
{
	mainView.router.loadContent($('#thankyou-tpl').html());
}

/*$$('.form-to-data').on('click', function(){

		
		myApp.alert("button has been clicked!");
		var formData = myApp.formToData('#my-form');
		var username = $("#username").val();
		var password = $("#password").val();
		var login = 'login';
		
		$.ajax({  
		
			type: 'POST',  
			url: 'http://www.zambezitube.tv/login.php',
			//url: 'php/login.php', 
			data: { username: username, password: password, login:login },
			success: function(response) {
				if(response=="success")
				{
						alert("Logging You In...");
						launchVideos();
						$("#uploadbtn").show ();
		 				$("#logoutbtn").show ();					
				}
				if(response=="failed")
				{
					alert("Username And Password Don't Match!");	
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				
					alert("Error..."+errorThrown);
			}
			
		});

});*/ 
//myApp.popup('.popup-terms');
/*
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
		var self = this;
 		this.store = new MemoryStore(function() {
        	$('.policy-content').html(new PrivacyPolicy(self.store).render().el);//load the home div class
   		});	
		
    },
	
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
		document.getElementById("exitbtn").addEventListener ("click", this.exitApp, false);
		document.getElementById("uploadbtn").addEventListener ("click", this.uploadVideo, false);
		document.getElementById("logoutbtn").addEventListener ("click", this.LogOut, false);
		
		document.getElementById("homebtn").addEventListener ("click", this.returnHome, false);
		document.getElementById("regbtn").addEventListener ("click", this.regUser, false);
		document.getElementById("vidmnu").addEventListener ("click", this.vidMenu, false);
		document.getElementById("logbtn").addEventListener ("click", this.logUser, false);
		
		
		 $("#uploadbtn").hide ();
		 $("#logoutbtn").hide ();
		 
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
	showAlert: function(message, title) {
		
		alert(title ? (title + ": " + message) : message);
		
	},
	exitApp: function() {
		navigator.app.exitApp();
	},
	LogOut: function() {
		
			$.ajax({  
		
			type: 'POST',  
			url: 'http://www.zambezitube.tv/logout.php',
			//url: 'php/logout.php', 
			success: function(response) {
				if(response=="success")
				{
					
					alert("You have been logged out!");
					returnHome();
					
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				
				alert("Error..."+errorThrown);
			}
			
		});
	},
	uploadVideo: function() {
		
		var self = this;
		this.store = new MemoryStore(function() {
			$('.main-content').html(new UploadVideo(self.store).render().el);//load the home div class
		});	
		
	},
	
	returnHome: function() {
		
		var self = this;
		this.store = new MemoryStore(function() {
			$('.main-content').html(new HomeView(self.store).render().el);//load the home div class
			$("#navbar").collapse('hide');
		});	
		
	},
	regUser: function() {
		
		var self = this;
		this.store = new MemoryStore(function() {
			$('.main-content').html(new SignUp(self.store).render().el);//load the home div class
			$("#navbar").collapse('hide');
		});	
		
	},
	logUser: function() {
		
		var self = this;
		this.store = new MemoryStore(function() {
			$('.main-content').html(new HomeView(self.store).render().el);//load the home div class
			$("#navbar").collapse('hide');
		});	
		
	},
	vidMenu: function() {
		
		var self = this;
		this.store = new MemoryStore(function() {
			$('.main-content').html(new VideoPage(self.store).render().el);//load the home div class
			$("#navbar").collapse('hide');
		});	
		
	}
	
};
*/