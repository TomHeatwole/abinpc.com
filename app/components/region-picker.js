import Ember from 'ember';

// The following parameters should be passed in: region, regionName, model, teamNameMap

export default Ember.Component.extend({
    
  names: {},
  teams: {},
  games: {},

  init: function() {
    this._super();
    var names = {};
    for (var i = 1; i < 17; i++)
      names[i] = this.get('teamNameMap')[this.get('region') + i];
    this.set('names', names);
  },

  actions: {
    dosomething() {
       console.log('something');
    }
  } 

});
