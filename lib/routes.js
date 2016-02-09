Router.configure({
	layoutTemplate: 'MainLayout'
});


Router.route('/', {
	name: 'home',
	action(){
	GAnalytics.pageview();
	this.render('Homepage');
}
});

Router.route('/university-book', {
	name: 'university-book',
	action() {
	GAnalytics.pageview();
	this.render('Universities');
}
});

Router.route('/college/:_id',{
	name: 'collegeShow',
	action(){
		GAnalytics.pageview();
		this.render('collegeShow');	
	},
	data: function(){
		Meteor.subscribe('universities');
		return Universities.findOne(this.params._id);
	}

});
