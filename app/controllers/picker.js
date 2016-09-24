import Ember from 'ember';

export default Ember.Controller.extend({
   
  allowPicks: false,

  teamNameMap: '', // Will store the names of all of the teams their code
  AName: '',
  BName: '',
  CName: '',
  DName: '',

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
    cont() { // continue
      // Implement validations based on selected region, also update completed region
      this.set('ASelected', false);
      this.set('BSelected', false);
      this.set('CSelected', false);
      this.set('DSelected', false);
      if (this.get('ACompleted') && this.get('BCompleted') && this.get('CCompleted') && this.get('DCompleted'))
	this.set('FSelected', true);
      else
        this.set('noneSelected', false);
    },
    submit(model) {
      model.save();
    }
  }
  // TOOD: Implement validations manually since every Ember valdiations library is pretty awful.
});
