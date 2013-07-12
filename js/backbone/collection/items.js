AppCenter.Collections.ItemsCollection = Backbone.Collection.extend({
    model: AppCenter.Models.ItemModel,
    url:"",
    name:"items",
    refreshData : function(callback){
        var self = this;
        var url = 'data/menu.json';


        var xhr = $.get(url);

        xhr.done(function(data){
            self.reset();
            data.forEach(function(item){
                self.add(item);
            });
            if (callback){
                callback();
            }
        });
    },
    doneRefresh:function(){},
    search : function(letters){
        if(letters == "") return this;
        var pattern = new RegExp(letters,"gi");
        return _(this.filter(function(data) {
            return pattern.test(data.get("appname"));
        }));
    }, 
    favorites : function(){
        var pattern = new RegExp('true',"gi");
        return _(this.filter(function(data) {
            return pattern.test(data.get("favorite"));
        }));
    },
    comparator : function(item){
        return item.get("name");    
    },
    getOne : function(id){
        return this.filter(function(data) {
            return data.get("id") == id;
        });
    },
    parse : function(resp) {
        return resp.data;
    }
});

AppCenter.Collections.items = AppCenter.Collections.ItemsCollection;