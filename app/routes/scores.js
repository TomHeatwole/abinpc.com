import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, model) {
    this._super(controller, model);
    var playerSet = [];
    var gameSet = [];
    var self = this;
    this.store.findRecord('admin', 1).then(function(admin) {
      controller.set('allowPicks', admin.get('pre'));
      self.store.findAll('player').then(function(players) {
	players.forEach(function(player) {
	  if (player.get('season') === admin.get('season')) {
	    playerSet.push(player);
	  }
	});
      });
      self.store.findAll('game').then(function(games) {
	games.forEach(function(g) {
	  if (g.get('season') === admin.get('season')) {
	    gameSet[g.get('gameNumber')] = g;
	  }
	});
      });
      controller.set('players', playerSet);
      controller.set('games', gameSet);
    });
  },
  actions: {
    refresh() {
      location.reload();
    }
  }
});
