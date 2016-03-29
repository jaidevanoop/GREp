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
		return Universities.find({greCutoff: {$gt: value2, $lt: value1}}, {sort: {greCutoff: 1}});
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
	// 'selectedClass': function(){
	// 	var playerID = this._id;
	// 	var selectedPlayer = Session.get('selectedPlayer');
	// 	if(selectedPlayer == playerID){
	// 		return "selected"
	// 	}

	// },
	// 'showSelectedPlayer': function(){
	// 	var selectedPlayer = Session.get('selectedPlayer');
	// 	return Universities.findOne(selectedPlayer);
	// },
	index: function () {
    	return UniIndex;
	},
	selectedUni: function(){
		// var selectedUni = Session.get('selectedUni');
		// return Universities.findOne(selectedUni);
		return Session.equals("selectedUni", this.__originalId) ? "selected" : '';
	},
	// selectedName: function () {
 //      var player = UniIndex.config.mongoCollection.findOne({ __originalId: Session.get("selectedPlayer") });
 //      return player && player.name;
 //    },
});

Template.searchboard.events({
	'click .uni': function(){
		// console.log(this._id);
		var uniID = this.__originalId;
		Session.set('selectedUni', uniID);
		Session.set('collegeSelected',uniID);
	}
});

Template.univ.helpers({
selected: function () {
  return Session.equals("selectedUni", this.__originalId) ? "selected" : '';
//    var selectedUni = Session.get('selectedUni');
		// return Universities.findOne(selectedUni);
}
});

Template.univ.events({
'click': function () {
  Session.set("selectedUni", this.__originalId);
}
});
