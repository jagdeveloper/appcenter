AppCenter.Views.LoginView = Backbone.View.extend({
	events:{
		"click #loginButton": "login"
	},
	className:"",
	initialize : function(model){
		var self = this;
	},
	render: function(data) {
		$(this.el).html(this.template());
        return this;
	},
	login:function(event){
		event.preventDefault(); 
        $('.message').hide(); 
        var url = 'data/login.json';
        console.log('Loggin in... ');
        var formValues = {
            user: $('#user').val(),
            password: $('#password').val()
        };

        $.ajax({
            url:url,
            type:'POST',
            dataType:"json",
            data: formValues,
            success:function (data) {
                console.log(["Login request details: ", data]);
               
                if(data.user != formValues.user) {  // If there is an error, show the error messages
                    $('.message #text').text(data.user);
                    $('.message').show();
                }
                else { // If not, send them back to the home page
                    Backbone.history.navigate("/home", {trigger: true});
                }
            }
        });
	}
});
