Router.route('/', {
	name: 'home',
	action(){
	GAnalytics.pageview();
	BlazeLayout.render('Homepage');
}
});

Router.route('/university-book', {
	name: 'university-book',
	action() {
	GAnalytics.pageview();
	BlazeLayout.render('MainLayout', {main: 'Universities'});
}
});
