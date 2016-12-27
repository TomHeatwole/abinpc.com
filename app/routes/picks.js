import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('ASelected',false);
    controller.set('BSelected',false);
    controller.set('CSelected',false);
    controller.set('DSelected',false);
    controller.set('FSelected',false);
    var map1 = {};
    var map2 = {};
    var playerSet = [];
    var gameSet = {};
    var self=this;
    this.store.findRecord('admin', 1).then(function(admin) {
      controller.set('allowPicks', admin.get('pre')); 

      self.store.findAll('teamset').then(function(sets){
	sets.forEach(function(set) {
	  if (set.get('season') === admin.get('season')) {
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
	      map1[code] = set.get(code); //Eaxmple: map[A1] = Kentucky
	      map2[set.get(code)] = code; //Example: map[Kentucky] = A1
	      if (code === "D16") {
		map1['TBD'] = 'TBD';
		controller.set('teamNameMap', map1);
		controller.set('teamCodeMap', map2);
	      }
	    }
	  }
	});
      });
      self.store.findAll('regionset').then(function(sets) {
	sets.forEach(function(set) {
	  if (set.get('season') === admin.get('season')) {
	    controller.set('A', set.get('A'));
	    controller.set('B', set.get('B'));
	    controller.set('C', set.get('C'));
	    controller.set('D', set.get('D'));
	  }
	});
      });
      self.store.findAll('player').then(function(players) {
	players.forEach(function(player) {
	  if (player.get('season') === admin.get('season')) {
	    playerSet.push(player);
	  }
	});
      });
      self.store.findAll('game').then(function(games) {
	games.forEach(function(game) {
	  if (game.get('season') === admin.get('season')) {
	    gameSet[game.get('gameNumber')] = game;
	  }
	});
      });
      controller.set('players', playerSet);
      controller.set('games', gameSet);
    });
  }
});
