import Ember from 'ember';

export default Ember.Controller.extend({
   
  allowPicks: false,

  teamNameMap: '', // Will store the names of all of the teams by their code
  teamCodeMap: '', // Will store the codes of all of the teams by their name
  accessKeys: '', // Will store the list of valid access keys for the current season
  season: '',
  AName: '',
  BName: '',
  CName: '',
  DName: '',

  validKey: false,
  keyError: false,
  nameError: false,

  ASelected: false,
  BSelected: false,
  CSelected: false,
  DSelected: false,
  ACompleted: false,
  BCompleted: false,
  CCompleted: false, 
  DCompleted: false,
  FSelected: false, // F for final four
  noneSelected: true,

  FA: '',
  FB: '',
  FC: '',
  FD: '',
  FW1: 'TBD',
  FW2: 'TBD',
  FW3: 'TBD',

  failure: false,
  failure2: false,
  lastScreen: false,
  done: false,

  loading: true,
  
  actions: {
    enterKey() {
      this.set('keyError', true);
      this.set('nameError', false);
      if (!this.get('model').get('name') || this.get('model').get('name').length < 2 ||
		this.get('model').get('name').length > 35) {
	this.set('nameError', true);      
      }
      if (this.get('model').get('accessKey')) {
	for (var i = 0; this.get('accessKeys')[i]; i++) {
	  if (this.get('accessKeys')[i] === this.get('model').get('accessKey')) {
	    this.set('keyError', false);
	  }
	}
      }
      if (!this.get('nameError') && !this.get('keyError')) {
	this.set('validKey', true);
      }
      
    },
    selectA() {
      this.set('ASelected', true);
      this.set('noneSelected', false);
    },
    selectB() {
      this.set('BSelected', true);
      this.set('noneSelected', false);
    },
    selectC() {
      this.set('CSelected', true);
      this.set('noneSelected', false);
    },
    selectD() {
      this.set('DSelected', true);
      this.set('noneSelected', false);
    },
    cont() {
      if (this.get('ASelected')) {
	this.set('ACompleted', true);
      } else if (this.get('BSelected')) {
	this.set('BCompleted', true);
      } else if (this.get('CSelected')) {
	this.set('CCompleted', true);
      } else if (this.get('DSelected')) {
	this.set('DCompleted', true);
      }
      this.set('ASelected', false);
      this.set('BSelected', false);
      this.set('CSelected', false);
      this.set('DSelected', false);
      if (this.get('ACompleted') && this.get('BCompleted') && this.get('CCompleted') && this.get('DCompleted')) {
	this.set('FA', this.get('teamNameMap')[this.get('model').get('pick57')]);
	this.set('FB', this.get('teamNameMap')[this.get('model').get('pick58')]);
	this.set('FC', this.get('teamNameMap')[this.get('model').get('pick59')]);
	this.set('FD', this.get('teamNameMap')[this.get('model').get('pick60')]);
	this.set('FSelected', true);
      } else {
        this.set('noneSelected', true);
      }
    },
    cont2() {
      this.set('failure', false);
      for (var i = 1; i < 4; i++) {
	if (this.get('model').get('pick6' + i) === 'TBD') {
	  this.set('failure', true);
	}
    var natChamp = this.get('model').get('pick63');
    if (natChamp !== this.get('model').get('pick62') && this.get('model').get('pick61') !== natChamp) {this.set('failure', true);}
      }
      if (!this.get('failure')) {
        this.set('lastScreen', true);
      }
    },
    pick(v) {
        var gameNumber = v.split(" ")[0];
        var gameWinner = parseInt(v.split(" ")[1]) - 1;
        var winnerName = "";
        if (gameNumber === '61') {
            winnerName = (gameWinner === 0) ? this.get('FA') : this.get('FB');
            this.set('FW1', winnerName);
        } else if (gameNumber === '62') {
            winnerName = (gameWinner === 0) ? this.get('FC') : this.get('FD');
            this.set('FW2', winnerName);
        } else {
            winnerName = (gameWinner === 0) ? this.get('FW1') : this.get('FW2');
            console.log(gameWinner);
            this.set('FW3', winnerName);
        }
      this.get('model').set('pick' + gameNumber, this.get('teamCodeMap')[winnerName]);
    },
    submit() {
      var self = this;
      var f2 = false;
      for (var i = 6; i < 9; i++) {
        if (document.getElementById('G' + i).value.charAt(0) === '-') {
          f2 = true;
        }
      }
      this.set('failure2', f2);
    if (f2) {return;}
	this.get('model').set('pickG8', document.getElementById('G8').value);
	this.get('model').set('pickG7', document.getElementById('G7').value);
	this.get('model').set('pickG6', document.getElementById('G6').value);
	for (i = 5; i < 9; i++) {
	  if (!this.get('model').get('pickG' + i) || this.get('model').get('pickG' + i).length > 23) {
	    this.set('failure2', true);
	  }
	}
      if (!this.get('failure2')) {
	self.store.findAll('key').then(function(keys) {
  	  keys.forEach(function(key) {
	    if (key.get('accessKey') === self.get('model').get('accessKey')) {
	      key.deleteRecord();
	      key.save(); // Console logs an error here, but it data is stored correctly.
	      console.log('The error above is expected and does not cause any issues');
	    }
	  });
	});
	for (var j = 1; j < 5; j++) {
	  this.get('model').set('pickG' + j, 'n/a');
	  this.get('model').set('sG' + j, 'TBD');
	}
	for (j = 5; j < 10; j++) {
	  this.get('model').set('sG' + j, 'TBD');
	}
	this.get('model').set('goodieScore', 0);
	this.get('model').set('season', this.get('season'));
	this.get('model').save();
	this.set('done', true);
      }
    }
  }
});
