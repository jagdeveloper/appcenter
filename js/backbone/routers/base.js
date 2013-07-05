AppCenter.Routers.BaseRouter = Backbone.Router.extend({
	routes: {
		"" :  "root",
		"home" :  "home",
		"article/:id" : "articleSingle"
	},
	initialize : function(){
		var self = this;

	},
	root: function(){
		var self = this;
		console.log('root');

		// Since the home view never changes, we instantiate it and render it only once
        if (!this.loginView) {
            this.loginView = new AppCenter.Views.LoginView();
            this.loginView.render();
        } else {
            this.loginView.delegateEvents(); // delegate events when the view is recycled
        }

        $(".container").html(this.loginView.el);
		
	},
	home: function(){
		var self = this;
		console.log('home');

		this.navigation();

		// Since the home view never changes, we instantiate it and render it only once
        if (!this.homeView) {
            this.homeView = new AppCenter.Views.HomeView();
            this.homeView.render();
        } else {
            this.homeView.delegateEvents(); // delegate events when the view is recycled
        }

        $(".container").html(this.homeView.el);		
	},
	navigation:function(){
		var self = this;
		console.log('navigation');

		// Since the home view never changes, we instantiate it and render it only once
        if (!this.navView) {
            this.navView = new AppCenter.Views.NavView();
            this.navView.render();
        } else {
            this.navView.delegateEvents(); // delegate events when the view is recycled
        }

        $(".main-nav").html(this.navView.el);	
	},
	articleSingle : function(id){
		console.log('articleSingle', id);

		$('#contenido > div').hide();

		$('#contenido #' + id).show();
	}
});