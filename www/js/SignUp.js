var SignUp = function(store) {

    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
		var btn = document.getElementById('nxt-button');
		if (this.btn)
		{
			//document.getElementById("nxt-button").addEventListener("click", loadNxtPage);
		}
		
    };

    this.render = function() {
        this.el.html(SignUp.template());
        return this;
    };

   	registerProfile = function() {


		var email = $("#email").val();
		var fullname = $("#fullname").val();
		var username = $("#username").val();
		var password = $("#password").val();
		
		$.ajax({  
		
			type: 'POST',  
			url: 'http://www.zambezitube.tv/signup.php',
			//url: 'php/signup.php', 
			data: { email: email, fullname: fullname,  username: username, password: password },
			success: function(response) {
				if(response=="success")
				{
					
					alert('REGISTRATION SUCCESSFUL!');
					thankYou();
				
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				
					alert("Error..."+errorThrown);
			}
			
		});

    };
		
	 launchVideos = function() {

	  var self = this;
	  this.store = new MemoryStore(function() {
		  $('.main-content').html(new VideoPage(self.store).render().el);//load the home div class
	  });	

    };
	
		 thankYou = function() {

	  var self = this;
	  this.store = new MemoryStore(function() {
		  $('.main-content').html(new ThanksPage(self.store).render().el);//load the home div class
	  });	

    };
		
    this.initialize();

}

function signUp()
{

}

SignUp.template = Handlebars.compile($("#signup-tpl").html());
