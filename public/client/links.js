Shortly.Links = Backbone.Collection.extend({

  model: Shortly.Link,
  url: '/links',
  sortVal: 'visits',
  comparator : function(link){
    switch(this.sortVal) {
      case 'visits':
        return -link.get('visits');
      case 'updated_at':
        var date = new Date(link.get('updated_at'));
        return -date;
      default:
        return link.get('title').toLowerCase();
    }
  }
});