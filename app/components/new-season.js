import Ember from 'ember';

/*
  Although this component will only be used once, I chose to make it it's own component
  for the purpose of organization. The admin controller is already one of the hardest
  files to organize, and creating 69 new variables would and one really, really
  long submit function probably wouldn't help.
*/

export default Ember.Component.extend({
  
  submitted: false,  
  
  name: '',
  A: '',
  B: '',
  C: '',
  D: '',
  A1: '',
  A2: '',
  A3: '',
  A4: '',
  A5: '',
  A6: '',
  A7: '',
  A8: '',
  A9: '',
  A10: '',
  A11: '',
  A12: '',
  A13: '',
  A14: '',
  A15: '',
  A16: '',
  B1: '',
  B2: '',
  B3: '',
  B4: '',
  B5: '',
  B6: '',
  B7: '',
  B8: '',
  B9: '',
  B10: '',
  B11: '',
  B12: '',
  B13: '',
  B14: '',
  B15: '',
  B16: '',
  C1: '',
  C2: '',
  C3: '',
  C4: '',
  C5: '',
  C6: '',
  C7: '',
  C8: '',
  C9: '',
  C10: '',
  C11: '',
  C12: '',
  C13: '',
  C14: '',
  C15: '',
  C16: '',
  D1: '',
  D2: '',
  D3: '',
  D4: '',
  D5: '',
  D6: '',
  D7: '',
  D8: '',
  D9: '',
  D10: '',
  D11: '',
  D12: '',
  D13: '',
  D14: '',
  D15: '',
  D16: '',

  createGame: function(gameNumber, team1, team2) {
      var store = this.get('targetObject.store');
      var game = store.createRecord('game');
      game.set('season', this.get('name'));
      game.set('team1', team1);
      game.set('team2', team2);
      game.set('gameNumber', gameNumber);
      game.set('winner', 'TBD'),
      game.save();
  },

  actions: {
    submit() {
      var store = this.get('targetObject.store');
      var self = this;
      store.findRecord('admin', 1).then(function(admin) {
	admin.set('season', self.get('name'));
        admin.set('pre', true);
	admin.save();
      });

      var regions = store.createRecord('regionset');
      regions.set('season', this.get('name'));
      regions.set('A', this.get('A'));
      regions.set('B', this.get('B'));
      regions.set('C', this.get('C'));
      regions.set('D', this.get('D'));
      regions.save();

      var teams = store.createRecord('teamset');
      teans.set('season', this.get('name'));
      teams.set('A1', this.get('A1'));
      teams.set('A2', this.get('A2'));
      teams.set('A3', this.get('A3'));
      teams.set('A4', this.get('A4'));
      teams.set('A5', this.get('A5'));
      teams.set('A6', this.get('A6'));
      teams.set('A7', this.get('A7'));
      teams.set('A8', this.get('A8'));
      teams.set('A9', this.get('A9'));
      teams.set('A10', this.get('A10'));
      teams.set('A11', this.get('A11'));
      teams.set('A12', this.get('A12'));
      teams.set('A13', this.get('A13'));
      teams.set('A14', this.get('A14'));
      teams.set('A15', this.get('A15'));
      teams.set('A16', this.get('A16'));
      teams.set('B1', this.get('B1'));
      teams.set('B2', this.get('B2'));
      teams.set('B3', this.get('B3'));
      teams.set('B4', this.get('B4'));
      teams.set('B5', this.get('B5'));
      teams.set('B6', this.get('B6'));
      teams.set('B7', this.get('B7'));
      teams.set('B8', this.get('B8'));
      teams.set('B9', this.get('B9'));
      teams.set('B10', this.get('B10'));
      teams.set('B11', this.get('B11'));
      teams.set('B12', this.get('B12'));
      teams.set('B13', this.get('B13'));
      teams.set('B14', this.get('B14'));
      teams.set('B15', this.get('B15'));
      teams.set('B16', this.get('B16'));
      teams.set('C1', this.get('C1'));
      teams.set('C2', this.get('C2'));
      teams.set('C3', this.get('C3'));
      teams.set('C4', this.get('C4'));
      teams.set('C5', this.get('C5'));
      teams.set('C6', this.get('C6'));
      teams.set('C7', this.get('C7'));
      teams.set('C8', this.get('C8'));
      teams.set('C9', this.get('C9'));
      teams.set('C10', this.get('C10'));
      teams.set('C11', this.get('C11'));
      teams.set('C12', this.get('C12'));
      teams.set('C13', this.get('C13'));
      teams.set('C14', this.get('C14'));
      teams.set('C15', this.get('C15'));
      teams.set('C16', this.get('C16'));
      teams.set('D1', this.get('D1'));
      teams.set('D2', this.get('D2'));
      teams.set('D3', this.get('D3'));
      teams.set('D4', this.get('D4'));
      teams.set('D5', this.get('D5'));
      teams.set('D6', this.get('D6'));
      teams.set('D7', this.get('D7'));
      teams.set('D8', this.get('D8'));
      teams.set('D9', this.get('D9'));
      teams.set('D10', this.get('D10'));
      teams.set('D11', this.get('D11'));
      teams.set('D12', this.get('D12'));
      teams.set('D13', this.get('D13'));
      teams.set('D14', this.get('D14'));
      teams.set('D15', this.get('D15'));
      teams.set('D16', this.get('D16'));
      teams.save();

      /*
	This for loop creates the first 32 games. The if statements determine which region
	that game is in to help identify the correct team code. The switch statement determines
	the seeds of the team in that game. Since the seeds are already set for the first 32
	games, these are set in stone, and can be determined by the gameNumber. Then, the
	values determined for r and s are used to construct the correct team code for team1
	and team2 for the given gameNumber, i.
      */
      
      var r = 'A'; //region
      var s = [1,16]; //seeds
      for (var i = 1; i < 33; i++) {
        if (i === 9) {
      	  r = 'B';
        } else if (i === 17) {
       	  r = 'C';
        } else if (i === 25) {
      	  r = 'D';
	}
	switch(i%8) {
	  case 0:
	    s = [2, 15];
	    break;
          case 1:
            s = [1, 16];
            break;
          case 2:
            s = [8,9];
            break;
          case 3: 
            s = [5, 12];
            break;
          case 4:
            s = [4, 13];
            break;
          case 5:
	    s = [6, 11];
	    break;
	  case 6:
	    s = [3, 14];
	    break;
	  case 7:
	    s = [7, 10];
	    break;
	}
	var team1 = '' + r + s[0];
	var team2 = '' + r + s[1];
	this.createGame(i, team1, team2);
      }

      /*
	This for loop creates the next 31 games. Because team1 and team2 haven't been determined
	yet, this loop is much simpler.
      */

      for (i = 33; i < 64; i++) {
	this.createGame(i, 'TBD', 'TBD');
      }
      this.set('submitted', true);
    }
  }
});
