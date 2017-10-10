var ThanksPage = function(store) {

    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
			  						$("#uploadbtn").show ();
		 				$("#logoutbtn").show ();
  		// Initialization work goes here.
	};
		
			 launchVideos = function() {

	  var self = this;
	  this.store = new MemoryStore(function() {
		  $('.main-content').html(new VideoPage(self.store).render().el);//load the home div class
	  });	


    };
	
		uploadVideo = function() {
		
		var self = this;
		this.store = new MemoryStore(function() {
			$('.main-content').html(new UploadVideo(self.store).render().el);//load the home div class
		});	
		
	};
		
	this.render = function() {

        this.el.html(ThanksPage.template());
        return this;

    };
	
    this.initialize();

}

ThanksPage.template = Handlebars.compile($("#thanks-tpl").html());
