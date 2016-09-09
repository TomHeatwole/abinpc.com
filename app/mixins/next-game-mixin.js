import Ember from 'ember';

/*
  This mixin is used to determine the gameNumber and position (team1/team2) where the winner of
  a game wil be sent.
*/

//TODO: There may be a problem with the final four games returning correctly. Test this hard
// before deploying.

export default Ember.Mixin.create({
  nextGame(gameNumber) {
    var number = 0;
    var position = "";
    if (gameNumber%2 === 1) {
      position = "team1";
    } else {
      position = "team2";
    }
    if (gameNumber < 33) {
      number = 32 + Math.ceil(gameNumber/2);
    } else if (gameNumber < 49) {
      number = 48 + Math.ceil((gameNumber-32)/2);
    } else if (gameNumber < 57) {
      number = 56 + Math.ceil((gameNumber-48)/2);
    } else if (gameNumber < 61) {
      number = 60 + Math.ceil((gameNumber-56)/2);
    } else { 
      number = 63;
    }
    return [number, position];
  }
});
