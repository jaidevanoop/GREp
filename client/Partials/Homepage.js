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

		var options = Session.get("options");
		if(options == undefined || options.length == 0)
		{
			var exp = {greCutoff: exp1, toeflCutoff: exp2};
		}
		else
		{
			var exp3 = { $in: options };
			var exp = {greCutoff: exp1, toeflCutoff: exp2, country: exp3};
		}
		
		var options2 = Session.get("options2");

		if(options2 == undefined || options2.length == 0)
		{
			var EXP = exp;
		}
		else
		{
			var exp4 = { $in: options2 };
			var exp5 = {'dept.category1': exp4};
			var exp6 = {'dept.category2': exp4};
			var exp7 = { $or: [exp5,exp6]};
			var EXP = { $and: [exp,exp7]};
		}


		// var exp = {greCutoff: exp1, toeflCutoff: exp2, country: exp3};
		var list = Universities.find(EXP, {sort:{greCutoff:-1,toeflCutoff:-1}});
		return list;
	},
	details: function(){
		if(Session.get('selectedUni'))
			return true;
		return false;
	}
});

Template.primaryCheckbox.helpers({
	countryOpt: function(){
		var myArray = Universities.find().fetch();
		var distinctArray = _.uniq(myArray, false, function(d) {return d.country});
		// var distinctEntries = _.uniq(Universities.find({}, {
    	// 	sort: {country: 1}, fields: {country: true}
		// }).fetch().map(function(x) {
    	// 	return x.country;
		// }), true);
		//var list = Universities.distinct("country");
		return distinctArray;
	}
});

Template.primaryCheckbox.events({
	'click #inlineCheckbox1': function(e,t){
		//e.preventDefault();

		var selected = t.findAll( "input[type=checkbox]:checked");

		var array = _.map(selected, function(item) {
   			return item.defaultValue;
		});

		Session.set("options",array);
	}
});

Template.secondaryCheckbox.helpers({
	departmentOpt: function(){
		//var myArray = Universities.find().fetch();
		var cat = [];

		Meteor.subscribe('universities');
		var mArray = Universities.find().fetch();
		// var distinctArray = _.uniq(myArray, false);
		//var mArray = Universities.find({}, {country:1});
		// var distinctArray = _.uniq(myArray, false, function(d) {return d.dept.category1});
		// var distinctArray = _.uniq(myArray, false, function(d) {return d.country});
		// console.log(distinctArray);
		for (var i = 0; i < mArray.length; i++) {
			var depart = mArray[i].dept;
			// console.log(depart[0].name);
			for (var j = 0; j < depart.length; j++) {
				// console.log(depart[i].name);
				var d = depart[j];
				// console.log(d);
				if (_.findWhere(cat, d.category1) == null) {
				    cat.push(d.category1);
				}
				if (_.findWhere(cat, d.category2) == null) {
				    cat.push(d.category2);
				}
			};
		};

		// console.log(cat);


		// return distinctArray;
		// return distinctArray;
		return cat;

	}
});

Template.secondaryCheckbox.events({
	'click #inlineCheckbox2': function(e,t){
		//e.preventDefault();

		var selected = t.findAll( "input[type=checkbox]:checked");

		var array = _.map(selected, function(item) {
   			return item.defaultValue;
		});

		Session.set("options2",array);
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
		start: [ 280, 335 ], // Handle start position
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
		start: [ 65, 115 ], // Handle start position
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
