import Ember from 'ember';


// Variables to read in: teamNameMap, teamCodeMap, players, regionName, region, games, action

export default Ember.Component.extend({
  picks: [],
  correct: [],
  complete: [],
  displayNames: [],

  init: function() {
    this._super();
    var regionAdd = 0;
    if (this.get('region') === 'B') {
      regionAdd = 8;
    } else if (this.get('region') === 'C') {
      regionAdd = 16;
    } else if (this.get('region') === 'D') {
      regionAdd = 24;
    }
    var regionGames = ['placeholder'];
    var gameNumbers = []; // ex. 9 maps to gameNumber 33 for region A
    for (var i = 1; i < 16; i++) {
      if (i < 9) {
	gameNumbers[i] = regionAdd + i;
      } else if (i < 13) {
	gameNumbers[i] = (regionAdd/2) + 24 + i;
      } else if (i < 15) {
	gameNumbers[i] = (regionAdd/4) + 36 + i;
      } else if (i === 15) {
	gameNumbers[i] = (regionAdd/8) + 42 + i;
      } 
    }
    for (i = 1; i < 16; i++) {
      regionGames.push(this.get('games')[gameNumbers[i]]);
    }
    var displayNames = [];
    var complete = [];
    for (i = 1; i < 16; i++) {
      var pair = [];
      pair['team1'] =  this.get('teamNameMap')[regionGames[i].get('team1')];
      pair['team2'] =  this.get('teamNameMap')[regionGames[i].get('team2')]; // displayNames[1] = [Virginia, Hampton] 
      complete['g' + i] = (regionGames[i].get('winner') !== 'TBD');
      displayNames[i] = pair;
    }
    this.set('displayNames', displayNames);
    this.set('complete', complete);
    var picks = [];
    for (i = 0; i < this.get('players').length; i++) {
      var row = []; 
      row['name'] = this.get('players')[i].get('name');
      for (var ii = 1; ii < 9; ii++) {
	row['p' + ii] = this.get('teamNameMap')[(this.get('players')[i].get('pick' + gameNumbers[ii]))];
      }
      picks.push(row);
    }
    this.set('picks', picks);
    //TODO: correct [][] takes in player's accessKey, then takes in regionGameNumber; returns whether pick is correct
  },
  actions: {
    back() {
      this.sendAction();
    }
  }
});
