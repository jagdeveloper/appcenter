AppCenter.Views.ItemView = Backbone.View.extend({
	events:{

	},
	className:"",
	initialize : function(model){
		var self = this;
	},
	render: function(data) {
		$(this.el).html(this.template());
        return this;
	}, 
});
