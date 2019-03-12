import Ember from 'ember';

export default Ember.Component.extend({
  playerPicks: [],
  success: false,
  bulkData: [],
  resetBulkData: function() {
      this.set('bulkData', [
          {correct: "", points: 0, name: "G1"},
          {correct: "", points: 0, name: "G2"},
          {correct: "", points: 0, name: "G3"},
          {correct: "", points: 0, name: "G4"},
          {correct: "", points: 0, name: "G5"},
          {correct: "", points: 0, name: "G6"},
          {correct: "", points: 0, name: "G7"},
          {correct: "", points: 0, name: "G8"},
          {correct: "", points: 0, name: "G9"},
      ]);
  },
  init: function() {
    this._super();
    this.set('success', false);
    var playerPicks = [];
    this.get('playerSet').forEach(function(player) {
      playerPicks.push(player);
    });
    this.set('playerPicks', playerPicks);
    this.resetBulkData();
  },
  
  actions: {
    update: function() {
      var checkBulkCorrect = [];
      var checkBulkPoints = [];
      for (var i = 0; i < 9; i++) {
          if (this.bulkData[i].correct !== "") {
              checkBulkCorrect.push({name: this.bulkData[i].name, value: this.bulkData[i].correct});
          }
          if (this.bulkData[i].points !== 0) {
              checkBulkPoints.push({name: this.bulkData[i].name, value: this.bulkData[i].points});
          }
      }
      var self = this;
      this.get('playerSet').forEach(function(player) {
        checkBulkCorrect.forEach(function(check) {
            player.set("s" + check.name, player.get("pick" + check.name) === check.value ? "correct" : "incorrect");
        });
        checkBulkPoints.forEach(function(check) {
            player.set("goodieScore", parseInt(player.get("goodieScore")) + (player.get("s" + check.name) === "correct" ? parseInt(check.value) : 0));
        });
        player.save();
      });
      this.set('success', true);
      this.resetBulkData();
    },
  }
  
});
