Meteor.publish('universities', function(){
    return Universities.find();
});