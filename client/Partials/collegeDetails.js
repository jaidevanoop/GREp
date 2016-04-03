Template.collegeShow.onRendered(function(){
	GoogleMaps.load();
});

Template.collegeShow.helpers({
  exampleMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
		// Meteor.subscribe('universities');
		var id = this._id;
		var uni = Universities.findOne(id);
      return {
        center: new google.maps.LatLng(uni.latitude,uni.longitude),
        zoom: 14,
      };
    }
  },
  'courses': function(){
		// Meteor.subscribe('universities');
		var id = this._id;
		if(Universities.findOne(id).coursesOffered){
			return true;
		}
		return false;
	},
	'bookmark': function(){
		var id = this._id;
		var user_id = Meteor.userId();
		var obj = Universities.findOne(id).bookmark;
		for (var i = 0; i < obj.length; i++) {
			if(obj[i] == user_id){
				return true;
			}	
		};		
		return false;
	}
});

Template.collegeShow.events({
	'click #mark': function(){
		var id = this._id;
		var user_id = Meteor.userId();
		Universities.update({_id: id},{$addToSet: { bookmark: user_id}});
	},
	'click #unmark': function(){
		var id = this._id;
		var user_id = Meteor.userId();
		Universities.update({_id: id},{$pull: { bookmark: user_id}});
	},
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
		var id = Session.get('selectedUni');
		return Universities.findOne(id);
	}
});

