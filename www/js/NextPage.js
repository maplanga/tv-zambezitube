var NextPage = function(store) {

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
        this.el.html(NextPage.template());
        return this;
    };

   loadHomePage = function() {

		var self = this;
 		this.store = new MemoryStore(function() {
        	$('.main-content').html(new HomeView(self.store).render().el);//load the home div class
   		});	

    };
		
    this.initialize();

}

NextPage.template = Handlebars.compile($("#nextpage-tpl").html());
