// The Template Loader. Used to asynchronously load templates located in separate .html files
window.templateLoader = {

    load: function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (AppCenter.Views[view]) {
                deferreds.push($.get('template/' + view + '.html', function(data) {
                    AppCenter.Views[view].prototype.template = _.template(data);
                }, 'html'));
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    }

};
window.page = {
    
    pagination : function(collection) {
        var page = this.page-1;
        if (!collection){
            var collection = this;
        }
        collection = _(collection.rest(this.perPage*page));
        collection = _(collection.first(this.perPage));    
        return collection.map( function(model) { return model } ); 
    },

    currentPage : function(currentPage){
        this.page = currentPage;
    }, 

    configPagination : function(size, perPage){
        if (!this.page){
            this.page = 1;
        }
        this.perPage = perPage;
        this.pages = parseInt(size/perPage);
        if ( (size/perPage) - parseInt(size/perPage) != 0 ){
            this.pages++;
        }

    }, 

    /**
    * Generate list page buttons links
    * @autor(Jhony Alexander Garcia Gómez - INTAP S.A.S)
    **/
    pageBar: function(){

        var pagebar = '';
        if (this.pages > 1){
            pagebar = '<ul> ' +
                          '<li class="' + (this.page == 1 ? 'active' : '') + '"><a href="#">«</a></li> ';

            for (var i = 1 ; i <= this.pages; i++) {

                pagebar += '<li class="' + (this.page == i ? 'active' : '') + '"><a href="#">' + i + '</a></li> ';
            };

            pagebar += '<li class="' + (this.page == this.pages ? 'active' : '') + '"><a href="#">»</a></li> '+
                       '</ul>';
        }
        return pagebar;
    }


};