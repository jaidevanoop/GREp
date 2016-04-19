Meteor.publish('universities', function(){
    return Universities.find();
});

Meteor.publish('comments', function(){
    return Comments.find();
});

// Meteor.publish('dept',function(){
// 	return DeptList.find();
// });