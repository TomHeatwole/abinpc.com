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
