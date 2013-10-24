window.Shortly = Backbone.View.extend({

  template: _.template(' \
      <h1>Shortly</h1> \
      <div class="navigation"> \
      <ul> \
        <li><a href="#" class="index">All Links</a></li> \
        <li><a href="#" class="create">Shorten</a></li> \
        <li><form><input type="text" id="filter"><button type="submit" class="submit">Submit</button></form></li> \
        <li><button type="submit" id="reorder" name="updated_at">Sort by Last Visited</button></li> \
        <li><button type="submit" id="reorder" name="title">Sort Alphabetically</button></li> \
        <li><button type="submit" id="reorder" name="visits">Sort by Visits</button></li> \
      </ul> \
      </div> \
      <div id="container"></div>'
  ),

  events: {
    "click li a.index":  "renderIndexView",
    "click li a.create": "renderCreateView",
    "keyup #filter": "filterByName",
    "click #reorder": "orderBy"
  },

  initialize: function(){
    console.log( "Shortly is running" );
    $('body').append(this.render().el);
    this.links = new Shortly.Links();
    this.linksView = new Shortly.LinksView( {collection: this.links} );
    this.linkCreateView = new Shortly.LinkCreateView();
    this.renderIndexView(); // default view
  },

  render: function(){
    this.$el.html( this.template() );
    return this;
  },

  renderIndexView: function(e){
    e && e.preventDefault();
    this.$el.find('#container').html( this.linksView.render().el );
    this.updateNav('index');
  },

  renderCreateView: function(e){
    e && e.preventDefault();
    this.$el.find('#container').html( this.linkCreateView.render().el );
    this.updateNav('create');
  },

  updateNav: function(className){
    this.$el.find('.navigation li a')
            .removeClass('selected')
            .filter('.'+className)
            .addClass('selected');
  },

  filterByName: function(e){
    var pattern = new RegExp($('#filter').val(),'i');
    $('.title').each(function(item){
      if(pattern.test($(this).text())){
        $(this).parent().parent().removeClass('hidden');
      } else {
        $(this).parent().parent().addClass('hidden');
      }
    });
  },

  orderBy: function(e){
    var sortOn = e.currentTarget.name;
    this.linksView.reorder(sortOn);
  }


});