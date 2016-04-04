Meteor.publish('universities', function(){
    return Universities.find();
});

Meteor.publish('comments', function(){
    return Comments.find();
});