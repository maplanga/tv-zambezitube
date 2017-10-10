var PrivacyPolicy = function(store) {

    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');

    };

    this.render = function() {
        this.el.html(PrivacyPolicy.template());
        return this;
    };

	acceptPP = function() {

	  var self = this;
	  this.store = new MemoryStore(function() {
		  $('.main-content').html(new HomeView(self.store).render().el);//load the home div class
	  });	

    };
		
    this.initialize();

}

PrivacyPolicy.template = Handlebars.compile($("#pp-tpl").html());
