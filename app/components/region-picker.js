import Ember from 'ember';

// The following parameters should be passed in: region, regionName, model, teamNameMap

export default Ember.Component.extend({
    
  teams: {},
  names: {},
  winners: {},
  regionAdd: 0,

  init: function() {
    this._super();
    var teams = {};
    var names = {};
    var winners = {};
    var games = {};
    if (this.get('region') === 'B') {
      this.set('regionAdd', 16); 
    } else if (this.get('region') === 'C') {
      this.set('regionAdd', 32);
    } else if (this.get('regoin') === 'D') {
      this.set('regionAdd', 48);
    }
    for (var i = 1; i < 17; i++) { 
      teams[i] = this.get('region') + i; // stores teams by team code
      names[i] = this.get('teamNameMap')[teams[i]]; //stores teams by name
      winners[i] = 'TBD'; // will store each game winner in order
      games[i] = this.get('regionAdd') + i; // stores gameNumbers
    }
    this.set('teams', teams);
    this.set('names', names);
    this.set('winners', winners);
  },

  actions: {
    pick() {
      var regionAdd = this.get('regionAdd');
      var winners = this.get('winners');
      for (var i = 1; i < 15; i++) {
	var w = document.getElementById('p' + i).value; //winner
	if (w !== '--Select Team--' && w !== 'TBD') {
	  if (winners[i] !== w && winners[i] !== 'TBD') {
	    for (var ii = i + 1; ii < 15; ii++) {
	      if (winners[ii] === winners[i]) {
		Ember.set(winners, '' + ii, 'TBD', true);
	      }
	    }
	  }
	  Ember.set(winners, '' + i, w, true);
	} else {
	  Ember.set(winners, '' + i, 'TBD', true);
	}
	// How to change it in the model? Should I do this here or during validation?
      }
      this.set('winners', winners);
    },
  } 
});
