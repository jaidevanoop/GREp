Meteor.methods({
	'addComment': function(message, collegeId) {

		var user = Meteor.user();

		if(!user) {
			throw new Meteor.Error('You must be logged in to submit comment!');
		}

		if(!message) {
			throw new Meteor.Error('Comment message can not be empty!');
		}

		if(!collegeId) {
			throw new Meteor.Error('College ID undefined!');
		}

		Comments.insert({
			username: user.username,
			collegeid: collegeId,
			userid: user._id,
			content: message,
			createdAt: Date.now()
		});
	},
	'deleteComment': function(commentId) {
		if(!commentId) {
			throw new Meteor.Error('Comment ID can not be empty!');
		}

		Comments.remove(commentId);
	}
});