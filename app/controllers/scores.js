import Ember from 'ember';

// players and games are passed in from setup_controller

export default Ember.Controller.extend({
  players: [],
  games: [],
  scores: [],

  loading: true,
  loadError: false,
  allowPicks: false,

  init: function() {
    this._super();
    var self = this;
    setTimeout(function() { //TODO: Implement correctly with callback instead of setTimeout
      self.set('loading', false);
      if (self.get('players').length === 0 || self.get('games').length === 0) {
	self.set('loadError', true);
      } else {
	var scores = []; 
	for (var i = 0; i < self.get('players').length; i++) {
	  var player = self.get('players')[i];
	  var row = [];
	  row['name'] = player.get('name');
	  var rScores = ['placeholder',0,0,0,0,0,0]; // Round scores: rScores[1] = round 1 score
	  var rCount = ['placeholder',0,0,0,0,0,0]; // rCount[1] = # of games correct in round 1
	  for (var ii = 1; ii < 64; ii++) {
	    var game = self.get('games')[ii];
	    if (player.get('pick' + ii) === game.get('winner')) {
	      if (ii < 33) { // round 1
		rCount[1] += 1;
		rScores[1] += 10;
		rScores[1] += self.findDifference(ii, game.get('winner')); // Multiplier is 1. 
	      } else if (ii < 49) { // round 2
		rCount[2]++;
		rScores[2] += 20;
		rScores[2] += 3*self.findDifference(ii, game.get('winner')); // Multiplier is 3. 
	      } else if (ii < 57) { // round 3
		rCount[3]++;
		rScores[3] += 30;
		rScores[3] += 5*self.findDifference(ii, game.get('winner')); // Multiplier is 5. 
	      } else if (ii < 61) { // round 4
		rCount[4]++;
		rScores[4] += 50;
		rScores[4] += 10*self.findDifference(ii, game.get('winner')); // Multiplier is 10. 
	      } else if (ii < 63) { // final 4 (round 5)
		rCount[5]++;
		rScores[5] += 80;
		rScores[5] += 15*self.findDifference(ii, game.get('winner')); // Multiplier is 15. 
	      } else if (ii === 63) { // finals (round 6) {
		rCount[6]++;
		rScores[6] += 130;
		rScores[6] += 20*self.findDifference(ii, game.get('winner')); // Multiplier is 20. 
	      }
	    }
	  }
	  var total = 0;
	  for (ii = 1; ii < 7; ii++) {
	    total += rScores[ii];
	    row['r' + ii + 'S'] = rScores[ii]; // r4S means "round 4 score"
	    row['r' + ii + 'C'] = rCount[ii]; // r2C means "round 2 count" (# of correct games)
	  }
	  row['goodies'] = player.get('goodieScore');
	  total += row['goodies'];
	  row['total'] = total;
	  var min = 0; //TODO: Implement with binary search instead
	  while (min !== scores.length && total < scores[min]['total']) {
	    min++;
	  }
	  if (min === scores.length) {
	    scores.push(row);
	  } else {
	    scores.splice(min, 0, row);
	  }
	} 
	self.set('scores', scores); 
      }
    }, 2500);
  },

  /*
    The findDifference function takes in a gameNumber and a winner and returns the difference
    between the seed of the winner and the seed that would win if all lower seeds won. (this
    value is a part of ABINPC scoring).
  */
  findDifference: function(gameNumber, winner) {
    var wSeed = winner.substring(1); //winner's seed
    if (gameNumber > 56) {
      return (parseInt(wSeed) - 1);
    }
    var pointsMap = [];
    switch(parseInt(wSeed)) {
      case 1:
	pointsMap = ['placeHolder',0,0,0];
	break;
      case 2:
	pointsMap = ['placeHolder',0,0,0];
	break;
      case 3:
	pointsMap = ['placeHolder',0,0,1];
	break;
      case 4:
	pointsMap = ['placeHolder',0,0,3];
	break;
      case 5:
	pointsMap = ['placeHolder',0,1,4];
	break;
      case 6:
	pointsMap = ['placeHolder',0,3,4];
	break;
      case 7:
	pointsMap = ['placeHolder',0,5,5];
	break;
      case 8:
	pointsMap = ['placeHolder',0,7,7];
	break;
      case 9:
	pointsMap = ['placeHolder',1,8,8];
	break;
      case 10:
	pointsMap = ['placeHolder',3,8,8];
	break;
      case 11:
	pointsMap = ['placeHolder',5,8,9];
	break;
      case 12:
	pointsMap = ['placeHolder',7,8,11];
	break;
      case 13:
	pointsMap = ['placeHolder',9,9,12];
	break;
      case 14:
	pointsMap = ['placeHolder',11,11,12];
	break;
      case 15:
	pointsMap = ['placeHolder',13,13,13];
	break;
      case 16:
	pointsMap = ['placeHolder',15,15,15];
	break;
    }
    if (gameNumber < 33) {
      return pointsMap[1];
    } 
    if (gameNumber < 49) {
      return pointsMap[2];
    }
    return pointsMap[3];
  }
});
