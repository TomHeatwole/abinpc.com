import Ember from 'ember';

export default Ember.Controller.extend({
  allowPicks: true,
  teamNameMap: {},
  teamCodeMap: {},
  players: [],
  games: {},

  A: '',
  B: '',
  C: '', 
  D: '',
  F: 'Final Four',

  ASelected: false,
  BSelected: false,
  CSelected: false,
  DSelected: false,
  FSelected: false,

  displayNames: [],
  FPicks: [],
  FCorrect: [],
  FIncorrect: [],

  actions: {
    selectA() {
      this.set('ASelected', true);
      this.set('BSelected', false);
      this.set('CSelected', false);
      this.set('DSelected', false);
      this.set('FSelected', false);
    },
    selectB() {
      this.set('ASelected', false);
      this.set('BSelected', true);
      this.set('CSelected', false);
      this.set('DSelected', false);
      this.set('FSelected', false);
    },
    selectC() {
      this.set('ASelected', false);
      this.set('BSelected', false);
      this.set('CSelected', true);
      this.set('DSelected', false);
      this.set('FSelected', false);
    },
    selectD() {
      this.set('ASelected', false);
      this.set('BSelected', false);
      this.set('CSelected', false);
      this.set('DSelected', true);
      this.set('FSelected', false);
    },
    selectF() {
      this.set('ASelected', false);
      this.set('BSelected', false);
      this.set('CSelected', false);
      this.set('DSelected', false);
      this.set('FSelected', true);

      var eliminated = [];
      for (var i = 1; i < 64; i++) {
	if (this.get('games')[i].get('winner') !== 'TBD') {
	  if (this.get('games')[i].get('winner') === this.get('games')[i].get('team1')) {
	    eliminated.push(this.get('games')[i].get('team2'));
	  } else {
	    eliminated.push(this.get('games')[i].get('team1'));
	  }
	}
      }
      var displayNames = [];
      for (i = 61; i < 64; i++) {
	var names = [];
	names['team1'] = this.get('teamNameMap')[this.get('games')[i].get('team1')];
	names['team2'] = this.get('teamNameMap')[this.get('games')[i].get('team2')];
	displayNames[i] = names;
      }
      this.set('displayNames', displayNames); 
      var FPicks = [];
      var FCorrect = [];
      var FIncorrect = [];
      for (i = 0; i < this.get('players').length; i++) {
	var row1 = []; // pciks
	var row2 = []; // correct
	var row3 = []; // incorrect
	row1['name'] = this.get('players')[i].get('name');
	row1['accessKey'] = this.get('players')[i].get('accessKey');
	for (var ii = 61; ii < 64; ii++) {
	  row1['p' + ii] = this.get('teamNameMap')[(this.get('players')[i].get('pick' + ii))];
	if (this.get('games')[ii].get('winner') === 'TBD') {
	  row2['g' + ii] = false;
	  row3['g' + ii] = (eliminated.includes(this.get('players')[i].get('pick' + ii))); 
	} else if (row1['p' + ii] === this.get('teamNameMap')[this.get('games')[ii].get('winner')]) {
	  row2['g' + ii] = true;
	  row3['g' + ii] = false;
	} else {
	  row2['g' + ii] = false;
	  row3['g' + ii] = true;
	}
      }
      FPicks.push(row1);
      FCorrect[this.get('players')[i].get('accessKey')] = row2;
      FIncorrect[this.get('players')[i].get('accessKey')] = row3;
    }
      this.set('FPicks', FPicks);
      this.set('FCorrect', FCorrect);
      this.set('FIncorrect', FIncorrect);
    },
    back() {
      this.set('ASelected', false);
      this.set('BSelected', false);
      this.set('CSelected', false);
      this.set('DSelected', false);
      this.set('FSelected', false);
    }
  }
});
