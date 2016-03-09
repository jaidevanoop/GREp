if(Meteor.isClient)
{
	// Template.searchboard.player =function(){
	// 	return "\nSome other text"
	// }
	
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

	

}