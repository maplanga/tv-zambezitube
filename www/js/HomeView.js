var HomeView = function(store) {

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
        this.el.html(HomeView.template());
        return this;
    };

   callSignUpPage = function() {

		var self = this;
 		this.store = new MemoryStore(function() {
        	$('.main-content').html(new SignUp(self.store).render().el);//load the home div class
   		});	

    };
	
   loginUser = function() {


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

    };
	
	launchVideos = function() {

	  var self = this;
	  this.store = new MemoryStore(function() {
		  $('.main-content').html(new VideoPage(self.store).render().el);//load the home div class
	  });	

    };
		
    this.initialize();

}

HomeView.template = Handlebars.compile($("#home-tpl").html());
