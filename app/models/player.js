import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  accessKey: DS.attr('string'),
  score: DS.attr('number'),
  pickset: DS.hasMany('pick', {async : true})
});
