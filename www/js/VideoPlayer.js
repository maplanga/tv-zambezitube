var VideoPlayer = function(store) {

    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
		
    };

    this.render = function() {
        this.el.html(VideoPlayer.template());
        return this;
		
    };
		
    this.initialize();

}

VideoPlayer.template = Handlebars.compile($("#video-tpl").html());

if ($("#videoholder").length == 0)
{
	console.log("the video holder is..."+$(".videoholder").html());
}
