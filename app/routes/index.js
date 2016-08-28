import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    scores() {
      this.transitionTo('scores');
    }
  }
});
