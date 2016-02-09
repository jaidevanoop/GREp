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
	this.render('MainLayout', {main: 'Universities'});
}
});
