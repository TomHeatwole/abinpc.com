import Ember from 'ember';
// import QueryFilterMixin from 'abinpc/mixins/query-filter-mixin';
import NextGameMixin from 'abinpc/mixins/next-game-mixin';

export default Ember.Route.extend(NextGameMixin, { 

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('correctPassword', false);
    controller.set('incorrectPassword', false);
    controller.set('enteredPassword', '');
    controller.set('keysMenu', false);
    controller.set('seasonMenu', false);
    controller.set('resultsMenu', false);
    controller.set('taskSelected', false);
    controller.set('keyCount', 0);
    controller.set('selectedWinner', '');
    controller.set('selectedTeam1', false);
    controller.set('selectedTeam2', false);
    controller.set('selectedGame', false);
    controller.set('nextGame', this.get('nextGame'));
   
    // Find out if we are currently allowing picks.
    var self = this;
    this.store.findRecord('admin', 1).then(function(admin) {
      controller.set('allowPicks', admin.get('pre'));

    // Store goodie data
      self.store.findAll('player').then(function(players) {
        var count = 0;
        var playerSet = [];
        players.forEach(function() {
          count++;
        });
        players.forEach(function(player) {
          if (player.get('season') === admin.get('season')) {
            playerSet.push(player); 
          }
          count--;
          if (count === 0) {
            controller.set('playerSet',playerSet);
          }
        });
       });
      
    // Store the team names in a map
      self.store.findAll('teamset').then(function(sets){
	sets.forEach(function(set) {
	  if (set.get('season') === admin.get('season')) {
	    var teamNames = {};
	    var region = "A";
	    var code = "";
	    for (var i = 0; i < 64; i++) {
	      if (i === 16) {
		region = "B";
	      } 
              if (i === 32) {
		region = "C";
	      }
	      if (i === 48) {
	  	region = "D";
              }
	      code = region + (i%16 + 1); 
	      teamNames[code] = set.get(code);
	      if (code === "D16") {
		controller.set('teamNames', teamNames);
	      }
	    }
	  }
	});
      });
    });
  } 
});
