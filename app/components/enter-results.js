import Ember from 'ember';

/*
  Like the new-season component, although this component is only used once, I chose to implement
  it as a component for organizational purposes in the admin controller.
*/

export default Ember.Component.extend({

  actions: {
    updateSelection() {
      console.log('when does this run?');
    }
  }
});
