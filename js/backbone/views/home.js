AppCenter.Views.HomeView = Backbone.View.extend({
	events:{
		"click #searchButton": "searchApp",
		"click #allButton" : "searchApp",
		"click #favoriteButton" : "searchFavorite",
		"click .pagination li" : "pagination"
	},
	className:"",
	initialize : function(model){
		var self = this;

		//Create items collection
		if(!window.collections.items){
			window.collections.items = new AppCenter.Collections.ItemsCollection();
		}
		window.collections.items.refreshData(function(){
			self.searchApp();
		});

		
	},
	render: function(data) {
		$(this.el).html(this.template());
		this.searchApp();
        return this;
	},
	renderItems : function(items){
		//Clear items container
		$('.items').html('');

		//Config pagination
		window.page.configPagination(items.length || items.size(), 6);
		$('.pagination').html(window.page.pageBar());
		var itemsView = window.page.pagination(items);

		itemsView.forEach(function(item){
			var view = new AppCenter.Views.ItemView(item);
			view.render();
			view.$el.appendTo(".items");
		});

		return this;
	}, 
	searchApp:function(){
		event.preventDefault();
		var searchText = $('#searchText').val();
		if (searchText != undefined){
			this.renderItems(window.collections.items.search(searchText));
		}
	}, 
	searchFavorite : function(){
		event.preventDefault();
		this.renderItems(window.collections.items.favorites());
	}, 
	pagination : function(e){
		event.preventDefault();
		if (e.target.text == '«'){
			if (window.page.page > 1){
				window.page.page -= 1;
			}
		}else if (e.target.text == '»'){
			if (window.page.page < window.page.pages){
				window.page.page += 1;
			}
		}else{
			window.page.currentPage(parseInt(e.target.text));
		}
		this.searchApp();
	}
});