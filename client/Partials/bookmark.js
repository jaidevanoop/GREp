// Template.bookmark.helpers({
// 	'obj': function() {
// 		console.log(Meteor.userId());
// 		return Universities.find({bookmark:{$in:[this.params._id]}});
// 	}
// });

Template.bookmark.helpers({
	'bookmark': function() {
		Meteor.subscribe('universities');
		var id = Meteor.userId();
		console.log(id);
		return Universities.find({bookmark:{$in:[id]}});
	}
});