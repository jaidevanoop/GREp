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

Template.moreCollegeDetails.helpers({
	'college': function(){
		Meteor.subscribe('universities');
		var id = Session.get('collegeSelected');
		return Universities.findOne(id);
	}
});