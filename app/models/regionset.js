import DS from 'ember-data';
/*
regionset is where the names of the regions are stored. A is the name of the region on the 
top left of the bracket. B is the bottom left, C is the top right, and D is the bottom
right.
*/
export default DS.Model.extend({
  A: DS.attr('string');
  B: DS.attr('string');
  C: DS.attr('string');
  D: DS.attr('string');
});
