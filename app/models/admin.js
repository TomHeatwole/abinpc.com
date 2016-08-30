import DS from 'ember-data';

/*
  Admin is not a model for admin users, but rather a single-instance model that
  stores single-case variables that are needed for running the website.
*/


export default DS.Model.extend({
  hash: DS.attr('number'), // Hashed value of the admin password
  pre: DS.attr('boolean'), // Stands for 'pre-season' determines whether to allow new picksets
  season: DS.attr('string')
});
