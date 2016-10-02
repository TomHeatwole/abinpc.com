import Ember from 'ember';

// The following parameters should be passed in: region, regionName, model, teamNameMap

export default Ember.Component.extend({
    
  // TODO: Right now the model isn't updating pick1 variable from inside the component but it may 
  // be updating from outside the component in the actual controller. Play with this, figure out
  // exactly which situations are causing it to work or not work, then figure out how to fix it
  // from there

  names: {},
  teams: {},
  games: {},

  init: function() {
    this._super();
    var names = {};
    var teams = {};
    var games = {};
    console.log(this.get('model').get('pick1'))
    games[1] = this.get('model').get('pick1');
    games[2] = 'wtf';
    this.get('model').set('pick1','grand slams');
    this.get('model').save();
    this.set('games', games);
  },

  actions: {

  } 

});
