Template.Search.helpers({
	details: function(){
		if(Session.get('collegeSelected'))
			return true;
		return false;
	}
});

Template.AdvSearch.helpers({
	slider: function() {
		return Session.get("slider");
	},
	filterGRE: function() {
		Meteor.subscribe('universities');
		var value1 = Session.get('filterHighGRE');
		var value2 = Session.get('filterLowGRE');
		var test1 = parseInt(value1,10);
		var test2 = parseInt(value2,10);
		var exp1 = { $gte : test2 , $lte : test1};
		var exp = {greCutoff: exp1};
		var list = Universities.find(exp, {sort: {greCutoff: 1}});
		return list;
	},
	details: function(){
		if(Session.get('selectedUni'))
			return true;
		return false;
	}
});

Template.AdvSearch.events({
	'click .uni': function() {
		var uniID = this._id;
		Session.set('selectedUni', uniID);
	}
});

Template.AdvSearch.rendered = function () {
	var range = document.getElementById('slider');

	noUiSlider.create(range, {
		start: [ 280, 310 ], // Handle start position
		step: 1, // Slider moves in increments of '1'
		margin: 10, // Handles must be more than '10' apart
		connect: true, // Display a colored bar between the handles
		//direction: 'rtl', // Put '0' at the bottom of the slider
		//orientation: 'vertical', // Orient the slider vertically
		behaviour: 'tap-drag', // Move handle on tap, bar is draggable
		range: { // Slider can select '0' to '100'
		'min': 260,
		'max': 340
	},
	});

	var valueLow = document.getElementById('value-input-low'),
		valueHigh = document.getElementById('value-input-high');

		// When the slider value changes, update the input and span
	range.noUiSlider.on('update', function( values, handle ) {
		if ( handle ) {
			valueHigh.value = values[handle];
			Session.set('filterHighGRE', values[handle]);
		} else {
			valueLow.value = values[handle];
			Session.set('filterLowGRE', values[handle]);
		}
	});

	// When the input changes, set the slider value
	valueHigh.addEventListener('change', function(){
		range.noUiSlider.set([null, this.value]);
		Session.set('filterHighGRE', this.value);
	});
	valueLow.addEventListener('change', function(){
		range.noUiSlider.set([this.value, null]);
		Session.set('filterLowGRE', this.value);
	});
};

Template.Homepage.events({
	'click #us': function(){
		Router.go('/search');
	}
})

Template.searchboard.helpers({
	inputAttributes: function () {
      return { 'class': 'easy-search-input', 'placeholder': 'Start searching...' };
    },
	uni: function(){
		Meteor.subscribe('universities');
		return Universities.find({}, {sort: {name: 1}})
	},
	index: function () {
    	return UniIndex;
	},
});

Template.searchboard.events({
	'click .uni': function(){
		var uniID = this.__originalId;
		Session.set('selectedUni', uniID);
		Session.set('collegeSelected',uniID);
	}
});

Template.univ.helpers({
	selected: function () {
	  return Session.equals("selectedUni", this.__originalId) ? "selected" : '';
	}
});

Template.univ2.helpers({
	selected: function () {
	  return Session.equals("selectedUni", this._id) ? "selected" : '';
	}
});
