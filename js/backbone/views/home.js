AppCenter.Views.HomeView = Backbone.View.extend({
	events:{
		
	},
	className:"",
	initialize : function(model){
		var self = this;
	},
	render: function(data) {
		$(this.el).html(this.template());
		this.searchApp();
        return this;
	}, 

	searchApp:function(){

		if(!window.collections.items){
			window.collections.items = new AppCenter.Collections.ItemsCollection();
			window.collections.items.on('add', function(model){
				var view = new AppCenter.Views.ItemView(model);

				view.render();

				view.$el.appendTo(".items");
			});
		}

		var url = 'data/menu.json';

		$.ajax({
            url:url,
            type:'POST',
            dataType:"json",
            success:function (data) {
            	data.forEach(function(item){
					window.collections.items.add(item);
				});
            }
        });
	}
});
