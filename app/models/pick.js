import DS from 'ember-data';

export default DS.Model.extend({
  //See models/game.js for information on what these two fields meany
  gameNumber: DS.attr('number'),
  winner: DS.attr('string')
});
