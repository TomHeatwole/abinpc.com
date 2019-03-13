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
  FSelected: false, // F for final 4
  GSelected: false, // G for goodies

  displayNames: [],
  FPicks: [],
  FCorrect: [],
  FIncorrect: [],
  GPicks: [],
  GCorrect: [],
  GIncorrect: [],

  loadError: false,
  loading: true,


  init: function() {
    this._super();
    var self = this;
    setTimeout(function() { //TODO: Implement correctly with callback instead of setTimeout
      self.set('loading', false);
      if (self.get('players').length === 0 || self.get('games').length === 0) {
	self.set('loadError', true);
      }
    }, 2500);
  },

  actions: {
    selectA() {
      this.set('ASelected', true);
      this.set('BSelected', false);
      this.set('CSelected', false);
      this.set('DSelected', false);
      this.set('FSelected', false);
      this.set('GSelected', false);
    },
    selectB() {
      this.set('ASelected', false);
      this.set('BSelected', true);
      this.set('CSelected', false);
      this.set('DSelected', false);
      this.set('FSelected', false);
      this.set('GSelected', false);
    },
    selectC() {
      this.set('ASelected', false);
      this.set('BSelected', false);
      this.set('CSelected', true);
      this.set('DSelected', false);
      this.set('FSelected', false);
      this.set('GSelected', false);
    },
    selectD() {
      this.set('ASelected', false);
      this.set('BSelected', false);
      this.set('CSelected', false);
      this.set('DSelected', true);
      this.set('FSelected', false);
      this.set('GSelected', false);
    },
    selectF() {
      this.set('ASelected', false);
      this.set('BSelected', false);
      this.set('CSelected', false);
      this.set('DSelected', false);
      this.set('FSelected', true);
      this.set('GSelected', false);

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
      for (i = 57; i < 64; i++) {
	var names = [];
	names['team1'] = this.get('teamNameMap')[this.get('games')[i].get('team1')];
	names['team2'] = this.get('teamNameMap')[this.get('games')[i].get('team2')];
	displayNames[i] = names;
      }
      this.set('displayNames', displayNames); 

      // Final 4
      var FPicks = [];
      var FCorrect = [];
      var FIncorrect = [];
      for (i = 0; i < this.get('players').length; i++) {
	var row1F = []; // pciks
	var row2F = []; // correct
	var row3F = []; // incorrect
	row1F['name'] = this.get('players')[i].get('name');
	row1F['accessKey'] = this.get('players')[i].get('accessKey');
	for (var ii = 57; ii < 64; ii++) {
	  row1F['p' + ii] = this.get('teamNameMap')[(this.get('players')[i].get('pick' + ii))];
	  if (this.get('games')[ii].get('winner') === 'TBD') {
	    row2F['g' + ii] = false;
	    row3F['g' + ii] = (eliminated.includes(this.get('players')[i].get('pick' + ii))); 
	  } else if (row1F['p' + ii] === this.get('teamNameMap')[this.get('games')[ii].get('winner')]) {
	    row2F['g' + ii] = true;
	    row3F['g' + ii] = false;
	  } else {
	    row2F['g' + ii] = false;
	    row3F['g' + ii] = true;
	  }
        }
        FPicks.push(row1F);
        FCorrect[this.get('players')[i].get('accessKey')] = row2F;
        FIncorrect[this.get('players')[i].get('accessKey')] = row3F;
      }
      this.set('FPicks', FPicks);
      this.set('FCorrect', FCorrect);
      this.set('FIncorrect', FIncorrect);
    },
    selectG() {
      this.set('ASelected', false);
      this.set('BSelected', false);
      this.set('CSelected', false);
      this.set('DSelected', false);
      this.set('FSelected', false);
      this.set('GSelected', true);

      //Goodies
      var GPicks = [];
      var GCorrect = [];
      var GIncorrect = [];
      for (var i = 0; i < this.get('players').length; i++) {
	var row1G = []; // pciks
	var row2G = []; // correct
	var row3G = []; // incorrect
	row1G['name'] = this.get('players')[i].get('name');
	row1G['accessKey'] = this.get('players')[i].get('accessKey');
    row1G['goodieScore'] = this.get('players')[i].get('goodieScore');
	for (var ii = 1; ii < 10; ii++) {
	  row1G['G' + ii] = this.get('players')[i].get('pickG' + ii);
	  if (this.get('players')[i].get('sG' + ii) === 'TBD') { 
	    row2G['G' + ii] = false;
	    row3G['G' + ii] = false;
	  } else if (this.get('players')[i].get('sG' + ii) === 'correct') {
	    row2G['G' + ii] = true;
	    row3G['G' + ii] = false;
	  } else {
	    row2G['G' + ii] = false;
	    row3G['G' + ii] = true;
	  }
	}
	GPicks.push(row1G);
        GCorrect[this.get('players')[i].get('accessKey')] = row2G;
        GIncorrect[this.get('players')[i].get('accessKey')] = row3G;
      }
      this.set('GPicks', GPicks);
      this.set('GCorrect', GCorrect);
      this.set('GIncorrect', GIncorrect);
    },
    back() {
      this.set('ASelected', false);
      this.set('BSelected', false);
      this.set('CSelected', false);
      this.set('DSelected', false);
      this.set('FSelected', false);
      this.set('GSelected', false);
    }
  }
});
