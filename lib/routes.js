Router.configure({
	layoutTemplate: 'MainLayout',
});


Router.route('/', {
	name: 'home',
	action(){
	GAnalytics.pageview();
	this.render('Homepage');
}
});

Router.route('/search', {
	name: 'search',
	action(){
	GAnalytics.pageview();
	this.render('Search');
}
});

Router.route('/advsearch', {
	name: 'advsearch',
	action(){
	GAnalytics.pageview();
	this.render('AdvSearch');
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

Router.route('/bookmark',{
	name: 'bookmark',
	action(){
		GAnalytics.pageview();
		this.render('bookmark');
	}

});

Router.route('/:username',{
	name: 'profile',
	action(){
		GAnalytics.pageview();
		this.render('profile');
	},
	data: function(){
		var username=Router.current().params.username;
		return Meteor.users.findOne({username:username});
	}

});

Router.route('/:username/edit',{
	name: 'profileEdit',
	action(){
		GAnalytics.pageview();
		this.render('profileEdit');
	},
	data: function(){
		var username=Router.current().params.username;
		return Meteor.users.findOne({username:username});
	}

});
