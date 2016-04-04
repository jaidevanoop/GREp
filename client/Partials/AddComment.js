Template.AddComment.events({
	'submit #addCommentForm': function(event,template){
		event.preventDefault();

		var message = event.target.addComment.value;

		//get College ID
		var collegeId = template.data._id;

		//console.log(message+'//'+collegeId);

		Meteor.call('addComment',message,collegeId,function(error) {
			// if(!error) {
			// 	alert('Comment Submitted');
			// } else {
			// 	alert('Comment submission failed!');
			// }
		});

		event.target.addComment.value = "";

	}
});

Template.singleComment.helpers({
	'commentDeleteRight': function() {
		if(Meteor.userId() == this.userid) {
			return true;
		} else {
			return false;
		}
	}
});

Template.singleComment.events({
	'click #deleteComment': function() {
		Meteor.call('deleteComment', this._id, function(error) {
			// if(!error) {
			// 	alert('Comment Deleted!');
			// } else {
			// 	alert('You can not delete this comment!');
			// }
		});
	}
});