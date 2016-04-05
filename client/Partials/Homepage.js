Template.Search.helpers({
	details: function(){
		if(Session.get('selectedUni'))
			return true;
		return false;
	}
});

Template.AdvSearch.helpers({
	filterGRE: function() {
		Meteor.subscribe('universities');
		var value1 = Session.get('filterHighGRE');
		var value2 = Session.get('filterLowGRE');
		var value3 = Session.get('filterHighToefl');
		var value4 = Session.get('filterLowToefl');
		var test1 = parseInt(value1,10);
		var test2 = parseInt(value2,10);
		var test3 = parseInt(value3,10);
		var test4 = parseInt(value4,10);
		var exp1 = { $gte : test2 , $lte : test1};
		var exp2 = { $gte : test4 , $lte : test3};
		var exp = {greCutoff: exp1, toeflCutoff: exp2};
		var list = Universities.find(exp, {sort:{greCutoff:-1,toeflCutoff:-1}});
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
	var range1 = document.getElementById('sliderGRE');
	var range2 = document.getElementById('sliderToefl');

	noUiSlider.create(range1, {
		start: [ 290, 320 ], // Handle start position
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

	noUiSlider.create(range2, {
		start: [ 85, 110 ], // Handle start position
		step: 1, // Slider moves in increments of '1'
		margin: 5, // Handles must be more than '10' apart
		connect: true, // Display a colored bar between the handles
		//direction: 'rtl', // Put '0' at the bottom of the slider
		//orientation: 'vertical', // Orient the slider vertically
		behaviour: 'tap-drag', // Move handle on tap, bar is draggable
		range: { // Slider can select '0' to '100'
		'min': 0,
		'max': 120
	},
	});


	var GREvalueLow = document.getElementById('GRE-value-input-low'),
		GREvalueHigh = document.getElementById('GRE-value-input-high'),
		ToeflvalueLow = document.getElementById('Toefl-value-input-low'),
		ToeflvalueHigh = document.getElementById('Toefl-value-input-high');

		// When the slider value changes, update the input and span
	range1.noUiSlider.on('update', function( values, handle ) {
		if ( handle ) {
			GREvalueHigh.value = values[handle];
			Session.set('filterHighGRE', values[handle]);
		} else {
			GREvalueLow.value = values[handle];
			Session.set('filterLowGRE', values[handle]);
		}
	});

	range2.noUiSlider.on('update', function( values, handle ) {
		if ( handle ) {
			ToeflvalueHigh.value = values[handle];
			Session.set('filterHighToefl', values[handle]);
		} else {
			ToeflvalueLow.value = values[handle];
			Session.set('filterLowToefl', values[handle]);
		}
	});

	// When the input changes, set the slider value
	GREvalueHigh.addEventListener('change', function(){
		range.noUiSlider.set([null, this.value]);
		Session.set('filterHighGRE', this.value);
	});
	GREvalueLow.addEventListener('change', function(){
		range.noUiSlider.set([this.value, null]);
		Session.set('filterLowGRE', this.value);
	});

	ToeflvalueHigh.addEventListener('change', function(){
		range.noUiSlider.set([null, this.value]);
		Session.set('filterHighToefl', this.value);
	});
	ToeflvalueLow.addEventListener('change', function(){
		range.noUiSlider.set([this.value, null]);
		Session.set('filterLowToefl', this.value);
	});
};

Template.Homepage.events({
	'click #us': function(){
		Router.go('/search');
	},
	'click #other': function(){
		window.alert("Coming Soon");
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
