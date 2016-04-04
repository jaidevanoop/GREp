Template.AddComment.events({
	'submit #addCommentForm': function(event,template){
		event.preventDefault();

		var message = event.target.addComment.value;

		//get College ID
		var collegeId = template.data._id;

		//console.log(message+'//'+collegeId);

		Meteor.call('addComment',message,collegeId,function(error) {
			// if(!error) {

			// } else {
				
			// }
		});

	}
});