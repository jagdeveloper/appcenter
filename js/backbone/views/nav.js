AppCenter.Views.NavView = Backbone.View.extend({
	events:{
		"click .brand": "home"
	},
	className:"",
	initialize : function(model){
		var self = this;
	},
	render: function(data) {
		$(this.el).html(this.template());
        return this;
	}, 
	home: function(){
		Backbone.history.navigate("/home", {trigger: true});
	}
});
