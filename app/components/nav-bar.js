import Ember from 'ember';

export default Ember.Component.extend({
	
  store: Ember.inject.service(),

  actions : {
    home() {
      this.get('router').transitionTo('index');
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
