import Ember from 'ember';

export default Ember.Component.extend({
  playerPicks: [],
  success: false,
  init: function() {
    this._super();
    this.set('success', false);
    var playerPicks = [];
    this.get('playerSet').forEach(function(player) {
      playerPicks.push(player);
    });
    this.set('playerPicks', playerPicks);
  },
  
  actions: {
    update: function() {
      var self = this;
      this.get('playerSet').forEach(function(player) {
        player.save();
        self.set('success', true);
      });
    }
  }
  
});
