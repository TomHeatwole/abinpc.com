import Ember from 'ember';

// The following parameters should be passed in: region, regionName, model, teamNameMap, teamCodeMap

export default Ember.Component.extend({
    
  teams: {},
  names: {},
  winners: {},
  games: {},
  matchUps: {},
  nextGameMap: {},
  regionAdd: 0,

  failure1: false, // Used for validations

  init: function() {
    this._super();
    var teams = {};
    var names = {};
    var winners = {};
    var games = {};
    if (this.get('region') === 'B') {
      this.set('regionAdd', 8); 
    } else if (this.get('region') === 'C') {
      this.set('regionAdd', 16);
    } else if (this.get('region') === 'D') {
      this.set('regionAdd', 24);
    }
    for (var i = 1; i < 17; i++) { 
      teams[i] = this.get('region') + i; // stores teams by team code
      names[i] = this.get('teamNameMap')[teams[i]]; //stores teams by name
      winners[i] = 'TBD'; // will store each game winner in order
      if (i < 9) {
      	games[i] = this.get('regionAdd') + i; // stores gameNumbers
      } else if (i < 13) {
	games[i] = (this.get('regionAdd')/2) + 24 + i;
      } else if (i < 15) {
	games[i] = (this.get('regionAdd')/4) + 36 + i;
      } else if (i === 15) {
	games[i] = (this.get('regionAdd')/8) + 42 + i;
      }
    }
    this.set('teams', teams);
    this.set('names', names);
    this.set('winners', winners);
    this.set('games', games);
    this.set('matchUps', ['', '1 16', '8 9', '5 12', '4 13',
        '6 11', '3 14', '7 10', '2 15', 'w1 w2', 'w3 w4', 'w5 w6',
        'w7 w8', 'w9 w10', 'w11 w12', 'w13, w14']);
    this.set('nextGameMap', ['',9,9,10,10,11,11,12,12,13,13,14,14,15,15,21]);
  },
    getWinner: function(id) {
        var radio = document.getElementById(id).childNodes;
        if (radio[0].checked) {return radio[0].value;}
        if (radio[1].checled) {return radio[1].value;}
        return null;
    },

  actions: {
    pick(v) {
        this.set('failure', false);
        var winners = this.get('winners');
        var games = this.get("games");
        var matchUps = this.get('matchUps');
        var nextGameMap = this.get("nextGameMap");
        var gameNumber = v.split(" ")[0];
        var gameWinner = parseInt(v.split(" ")[1]) - 1;
        var winnerSeed = matchUps[gameNumber].split(" ")[gameWinner];
        var wName = "";
        var wCode = "";
        if (winnerSeed.charAt(0) === 'w') {
            wName = winners[parseInt(winnerSeed.substring(1))];
            wCode = this.get('teamCodeMap')[wName];
        } else {
            wCode = this.get('region') + winnerSeed;
            wName = this.get('teamNameMap')[wCode];
        }
        if (winners[gameNumber] !== wName && winners[gameNumber] !== 'TBD' && gameNumber < 15) {
            var oldWinner = winners[gameNumber];
            for (var i = nextGameMap[gameNumber]; i <= 15; i = nextGameMap[i]) {
                if (winners[i] === oldWinner) {
                    Ember.set(winners, "" + i, 'TBD');
	                this.get('model').set('pick' + '' + games[gameNumber], 'TBD');
                }
            }
        }
        Ember.set(winners, gameNumber, wName);
	    this.get('model').set('pick' + '' + games[gameNumber], wCode);
        this.set('winners', winners);
    },
    check() {
      this.set('failure', false);
      var games = this.get('games');
      for (var i = 1; i < 16; i++) {
        var w = this.get('model').get('pick' + games[i]);
        if (w === 'TBD') {
          this.set('failure', true);
          return;
        }
      }
      this.sendAction();     
    }
  } 
});
