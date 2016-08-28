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
      var newPlayer = this.get('store').createRecord('player', {
	name: 'player1',
	accessKey: '37x8e',
	score: 0
      });
      newPlayer.save();
    }
  }
});
