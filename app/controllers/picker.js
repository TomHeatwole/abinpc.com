import Ember from 'ember';

export default Ember.Controller.extend({
   
  allowPicks: false,

  teamNameMap: '', // Will store the names of all of the teams their code
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
  
  actions: {
    enterKey() {
      this.set('keyError', true);
      this.set('nameError', false);
      if (!this.get('model').get('name') || this.get('model').get('name').length < 2 
	  || this.get('model').get('name').length > 35) {
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
	this.set('FSelected', true);
      } else {
        this.set('noneSelected', true);
      }
    },
    submit() {
      this.get('model').save();
    }
  }
});
