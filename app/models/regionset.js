import DS from 'ember-data';
/*
  Regionset is where the names of the regions are stored. A is the name of the region on the 
  top left of the bracket. B is the bottom left, C is the top right, and D is the bottom
  right.
*/
export default DS.Model.extend({
  season: DS.attr('string'), // Determines which season of abinpc this data belongs to
  A: DS.attr('string'),
  B: DS.attr('string'),
  C: DS.attr('string'),
  D: DS.attr('string')
});
