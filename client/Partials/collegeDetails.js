Template.collegeDetails.helpers({
	'college': function(){
		Meteor.subscribe('universities');

		return Universities.find({});
	},
	'selected': function(){
		var id = Session.get('collegeSelected');
		if(this._id == id)
			return "active"
	}

});

Template.collegeDetails.events({
	'click .list-group-item': function(){
		Session.set('collegeSelected',this._id);
	}
});

Template.collegeShow.onRendered(function(){
	GoogleMaps.load();
});

Template.collegeShow.helpers({
  exampleMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(-37.8136, 144.9631),
        zoom: 12
      };
    }
  }
});

Template.collegeShow.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('exampleMap', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
  });
});

Template.moreCollegeDetails.helpers({
	'college': function(){
		Meteor.subscribe('universities');
		var id = Session.get('collegeSelected');
		return Universities.findOne(id);
	}
});
