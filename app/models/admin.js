import DS from 'ember-data';

export default DS.Model.extend({
  hash: DS.attr('number'), // Hashed value of the admin password
  pre: DS.attr('boolean') // Stands for 'pre-season' determines whether to allow new picksets
});
