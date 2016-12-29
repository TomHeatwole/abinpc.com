import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    rules() {
      this.transitionTo('rules');
    },
    picker() {
      this.transitionTo('picker');
    },
    about() {
      window.location.href= "http://tomheatwole.atwebpages.com";
    }
  }
});
