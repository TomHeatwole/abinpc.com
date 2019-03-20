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
      for (var i = 0; i < 8; i++) {
          if (this.bulkData[i].correct !== "") {
              checkBulkCorrect.push({name: this.bulkData[i].name, values: this.bulkData[i].correct.split(",")});
          }
          if (this.bulkData[i].points !== 0) {
              checkBulkPoints.push({name: this.bulkData[i].name, value: this.bulkData[i].points});
          }
      }
      this.get('playerSet').forEach(function(player) {
          if (player.get('goodieScore') === "DELETE") player.deleteRecord(); 
        checkBulkCorrect.forEach(function(check) {
            var correct = false;
            check.values.forEach(function(value) {
                if (player.get("pick" + check.name) === value.trim()) {
                    correct = true;
                }
            });
            player.set("s" + check.name, correct ? "correct" : "incorrect");
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
