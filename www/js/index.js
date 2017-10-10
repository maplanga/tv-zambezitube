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
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
		var self = this;
 		this.store = new MemoryStore(function() {
        	$('.main-content').html(new PrivacyPolicy(self.store).render().el);//load the home div class
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
