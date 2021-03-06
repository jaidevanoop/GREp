Template.collegeShow.onRendered(function(){
	GoogleMaps.load();
});

Template.collegeShow.helpers({
  exampleMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
		var id = this._id;
		var uni = Universities.findOne(id);
      return {
        center: new google.maps.LatLng(uni.latitude,uni.longitude),
        zoom: 14,
      };
    }
  },
  'departments': function(){
		var id = this._id;
		if(Universities.findOne(id).dept){
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
	},
	'like': function(){
		var id = this._id;
		var user_id = Meteor.userId();
		var obj = Universities.findOne(id).like;
		for (var i = 0; i < obj.length; i++) {
			if(obj[i] == user_id){
				return true;
			}
		};
		return false;
	},
	'likeCount': function(){
		var id = this._id;
		var obj = Universities.findOne(id).like;
		return obj.length;
	},
	'comments': function() {
		Meteor.subscribe('comments');
		var num = Session.get('limit');
		//console.log(typeof(num));
		var obj = Comments.find({collegeid: this._id},{sort:{createdAt:-1},limit:num});
		return obj;
	},
	'remain': function() {
		var num = Comments.find({collegeid: this._id}).count() - Session.get('limit');
		if(num <= 0)
			return 0;
		return num;
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
	'click #like': function(){
		var id = this._id;
		var user_id = Meteor.userId();
		Universities.update({_id: id},{$addToSet: { like: user_id}});
	},
	'click #unlike': function(){
		var id = this._id;
		var user_id = Meteor.userId();
		Universities.update({_id: id},{$pull: { like: user_id}});
	},
	'click #loadmore': function() {
		var limit = Session.get('limit');
		Session.set('limit',limit*2);
	},
});

Template.collegeShow.onCreated(function() {
	Session.setDefault('limit',5);
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

Template.moreCollegeDetails.events({
	'click #view': function(){
		Session.set('selectedUni', null);
	}
});
