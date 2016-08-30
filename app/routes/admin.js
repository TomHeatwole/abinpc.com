import Ember from 'ember';

export default Ember.Route.extend({
  
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('correctPassword', false);
    controller.set('incorrectPassword', false);
    controller.set('enteredPassword', '');
  } 

});
