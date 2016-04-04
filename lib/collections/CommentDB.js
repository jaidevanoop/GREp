Comments = new Mongo.Collection('comments');

Comments.allow({
    insert: function(userId, doc) {
        return !!userId;
    },
    update: function(userId, doc) {
        return !!userId;
    },
    remove: function(userId, doc) {
        return !!userId;
    }
});

CommentSchema = new SimpleSchema({
    username: {
        type: String,
        label: "Name",
        // autoValue: () => {
        // 	return Meteor.userId();
        // },
        // autoform: {
        // 	type: 'hidden'
        // }
    },
    collegeid: {
        type: String,
        label: "College ID"
    },
    userid: {
        type: String,
        label: "User ID" 
    },
    content: {
        type: String,
        label: "Address"
    },
    createdAt: {
        type: Date,
        label: 'Created At',
        // autoValue: () => {
        //   return new Date();
        // },
        // autoform: {
        //   type: 'hidden'
        // }
    }
});

Comments.attachSchema( CommentSchema );
