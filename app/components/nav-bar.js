import Ember from 'ember';

export default Ember.Component.extend({
  actions : {
    home() {
      this.get('router').transitionTo('home');
    },
    picker() {
      this.get('router').transitionTo('picker');
    },
    picks() {
      this.get('router').transitionTo('picks');
    },
    scores() {
      this.get('router').transitionTo('scores');
    },
    records() {
      this.get('router').transitionTo('records');
    },
    rules() {
      this.get('router').transitionTo('rules');
    }
  }
});
