import Ember from 'ember';


// Expect: player, incorrect, correct, round

export default Ember.Component.extend({
  tagName: 'tr',
  r1: false, // Determine which round these picks are for
  r2: false,
  r3: false,
  F: false, // Final 4
  G: false, // Goodies
  pCorrect: [],
  pIncorect: [],
  
  init: function() {
    this._super();
    switch(this.get('round')) {
      case 1:
	this.set('r1', true);
	break;
      case 2:
	this.set('r2', true);
	break;
      case 3:
	this.set('r3', true);
	break;
      case 4: // 4 is for Final 4
	this.set('F', true);
	break;
      case 5: // 5 if for Goodies
	this.set('G', true);
	break;	
    }
    var pCorrect = [];
    var pIncorrect = [];
    var correct = this.get('correct');
    var incorrect = this.get('incorrect');
    pCorrect = correct[this.get('player').get('accessKey')];
    pIncorrect = incorrect[this.get('player').get('accessKey')]; 
    this.set('pCorrect', pCorrect);
    this.set('pIncorrect', pIncorrect);
  }
});
