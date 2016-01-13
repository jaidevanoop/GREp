Router.configure({
	layoutTemplate: 'MainLayout'
});

Router.route('/',function(){
	this.render('Homepage');
});
