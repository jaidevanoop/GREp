Template.collegeShow.onRendered(function(){
	GoogleMaps.load();
});

Template.collegeShow.helpers({
  exampleMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
		Meteor.subscribe('universities');
		var id = Session.get('collegeSelected');
		var uni = Universities.findOne(id);
		console.log(uni.name);
      return {
        center: new google.maps.LatLng(uni.latitude,uni.longitude),
        zoom: 14,
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


Template.collegeShow.helpers({
	'courses': function(){
		Meteor.subscribe('universities');
		var id = Session.get('collegeSelected');

		if(Universities.findOne(id).coursesOffered){
			return true;
		}
		return false;
	}
});
