import DS from 'ember-data';

export default DS.Model.extend({
  season: DS.attr('string'), // Determines which season of abinpc this data belongs to
  name: DS.attr('string'),
  accessKey: DS.attr('string'),
  score: DS.attr('number'),
  pickset: DS.hasMany('pick', {async : true})
});
