Meteor.startup(function() {
	// process.env.MAIL_URL='smtp://postmaster%40sandboxf5e3c6590fc2418788443ae68858b9a9.mailgun.org:01a9bfb2ae4a7595597c23a18ece90fb@smtp.mailgun.org:587';
	//
	// Accounts.emailTemplates.from = 'no-reply@yourdomain.com';
	// Accounts.emailTemplates.sitename = 'GREp';
	//
	// Accounts.emailTemplates.verifyEmail.subject = function(user){
	// 	return 'Confirm Your Email Address';
	// };
	// Accounts.emailTemplates.verifyEmail.text = function(user,url){
	// 	return 'Click on the following link to verify your email address: ' + url;
	// };
	//
	// Accounts.config({
	// 	sendVerificationEmail: true
	// });
});

Meteor.methods({
	"userExists": function(username){
		return !!Meteor.users.findOne({username: username});
	},
});
