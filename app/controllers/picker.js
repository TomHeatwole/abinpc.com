import Ember from 'ember';

export default Ember.Controller.extend({
   
  allowPicks: false,

  teamNameMap: '', // Will store the names of all of the teams by their code
  teamCodeMap: '', // Will store the codes of all of the teams by their name
  accessKeys: '', // Will store the list of valid access keys for the current season
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

  failure: false,
  done: false,
  
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
    pick() {
      var winner1 = document.getElementById('F1').value;
      var winner2 = document.getElementById('F2').value;
      var winner3 = document.getElementById('F3').value; 
      this.set('FW1', winner1);
      this.set('FW2', winner2);
      this.get('model').set('pick61', this.get('teamCodeMap')[winner1]);
      this.get('model').set('pick62', this.get('teamCodeMap')[winner2]);
      this.get('model').set('pick63', this.get('teamCodeMap')[winner3]);
      
    },
    submit() {
      var self = this;
      this.set('failure', false);
      for (var i = 1; i < 4; i++) {
	if (this.get('model').get('pick6' + i) === 'TBD') {
	  this.set('failure', true);
	}
        if (document.getElementById('F' + i).value === 'TBD' || document.getElementById('F' + i).value === '--Select Team--') {
	  this.set('failure', true);
	}
      }
      if (!this.get('failure')) {
	self.store.findAll('key').then(function(keys) {
  	  keys.forEach(function(key) {
	    if (key.get('accessKey') === self.get('model').get('accessKey')) {
	      key.deleteRecord();
	      key.save(); // Console logs an error here, but it data is stored correctly.
	    }
	  });
	});
	this.get('model').save();
	this.set('done', true);
      }
    }
  }
});
