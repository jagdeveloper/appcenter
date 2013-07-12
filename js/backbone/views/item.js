AppCenter.Views.ItemView = Backbone.View.extend({
	events:{
		"click #favorite": "favorite",
	},
	className:"",
	initialize : function(model){
		var self = this;

		this.model = model;

		this.model.on('change', function(){
			self.render();
		});
	},
	render: function(data) {
		$(this.el).html(this.template(this.model.toJSON()));
        return this;
	}, 
	favorite: function() {
		var favorite = this.model.get("favorite");
		this.model.set("favorite", !favorite);
	}, 
});
