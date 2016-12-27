import Ember from 'ember';


// Variables to read in: teamNameMap, teamCodeMap, players, regionName, region, games, action

export default Ember.Component.extend({
  picks: [],
  correct: [],
  incorrect: [],
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
    for (i = 1; i < 16; i++) {
      var pair = [];
      pair['team1'] = this.get('teamNameMap')[regionGames[i].get('team1')];
      pair['team2'] = this.get('teamNameMap')[regionGames[i].get('team2')]; // displayNames[1] = [Virginia, Hampton] 
      displayNames[i] = pair;
    }
    this.set('displayNames', displayNames);
    var eliminated = [];
    for (i = 1; i < 64; i++) {
      if (this.get('games')[i].get('winner') !== 'TBD') {
	if (this.get('games')[i].get('winner') === this.get('games')[i].get('team1')) {
	  eliminated.push(this.get('games')[i].get('team2'));
	} else {
	  eliminated.push(this.get('games')[i].get('team1'));
	}
      }
    }
    var picks = [];
    var correct = [];
    var incorrect = [];
    for (i = 0; i < this.get('players').length; i++) {
      var row1 = []; // pciks
      var row2 = []; // correct
      var row3 = []; // incorrect
      row1['name'] = this.get('players')[i].get('name');
      row1['accessKey'] = this.get('players')[i].get('accessKey');
      for (var ii = 1; ii < 16; ii++) {
	row1['p' + ii] = this.get('teamNameMap')[(this.get('players')[i].get('pick' + gameNumbers[ii]))];
	if (regionGames[ii].get('winner') === 'TBD') {
	  row2['g' + ii] = false;
	  row3['g' + ii] = (eliminated.includes(this.get('players')[i].get('pick' + gameNumbers[ii]))); 
	} else if (row1['p' + ii] === this.get('teamNameMap')[regionGames[ii].get('winner')]) {
	  row2['g' + ii] = true;
	  row3['g' + ii] = false;
	} else {
	  row2['g' + ii] = false;
	  row3['g' + ii] = true;
	}
      }
      picks.push(row1);
      correct[this.get('players')[i].get('accessKey')] = row2;
      incorrect[this.get('players')[i].get('accessKey')] = row3;
    }
    this.set('picks', picks);
    this.set('correct', correct);
    this.set('incorrect', incorrect);
  },
  actions: {
    back() {
      this.sendAction();
    }
  }
});
