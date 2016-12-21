import Ember from 'ember';

// The following parameters should be passed in: region, regionName, model, teamNameMap

export default Ember.Component.extend({
    
  teams: {},
  names: {},
  winners: {},
  games: {},
  regionAdd: 0,

  failure1: false, // Used for validations, failure1 means some picks were not entered
  failure2: false, // Used for validations, failure2 means some pikcs did not make sense

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
    this.set('games', games);
  },

  actions: {
    pick() {
      var winners = this.get('winners');
      for (var i = 1; i < 16; i++) {
	var w = document.getElementById('p' + i).value; // Winner
	if (w !== '--Select Team--' && w !== 'TBD') {
	  if (winners[i] !== w && winners[i] !== 'TBD') { // Make sure this is a change
	    for (var ii = i + 1; ii < 16; ii++) {
	      if (winners[ii] === winners[i]) {
		Ember.set(winners, '' + ii, 'TBD', true);
	      }
	    }
	  }
	  Ember.set(winners, '' + i, w, true);
	} else {
	  Ember.set(winners, '' + i, 'TBD', true);
	}
	// This line may need to get moved into the "continue" response
	this.get('model').set('pick' + this.get('games')[i], w);
      }
      this.set('winners', winners);
    },
    check() {
      this.set('failure1', false);
      this.set('failure2', false);
      var games = this.get('games');
      for (var i = 1; i < 16; i++) {
	var w = this.get('model').get('pick' + games[i]);
	if (w === 'TBD' || w === '--Select Team--') {
	  this.set('failure1', true);
	}
        if (i > 8) {
	  //2 * i - 16 and 2 * i - 17 'child' games of any given game
	  if (this.get('model').get('pick' + games[2*i - 16]) !== w &&
		this.get('model').get('pick' + games[2*i - 17]) !== w) {
	    this.set('failure2', true);
	  } 
	}
      }
      if (this.get('failure1') === false && this.get('failure2') === false) {
	this.sendAction(); // TODO: Parameter for sendaction
      }
    }
  } 
});
