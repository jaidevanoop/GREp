Template.moreCollegeDetails.helpers({
	'college': function(){
		Meteor.subscribe('universities');
		var id = Session.get('collegeSelected');
		return Universities.findOne(id);
	}
});
