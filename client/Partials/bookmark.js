Template.bookmark.helpers({
	'bookmark': function() {
		Meteor.subscribe('universities');
		var id = Meteor.userId();
		return Universities.find({bookmark:{$in:[id]}},{sort:{greCutoff:-1,toeflCutoff:-1}});
	}
});

Template.bookmark.events({
	'click .remove': function() {
		var id = this._id;
		var user_id = Meteor.userId();
		Universities.update({_id: id},{$pull: { bookmark: user_id}});
	}
});
