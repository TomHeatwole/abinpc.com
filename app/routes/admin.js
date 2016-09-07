import Ember from 'ember';
// import QueryFilterMixin from 'abinpc/mixins/query-filter-mixin';

export default Ember.Route.extend({ 

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('correctPassword', false);
    controller.set('incorrectPassword', false);
    controller.set('enteredPassword', '');
    controller.set('keysMenu', false);
    controller.set('seasonMenu', false);
    controller.set('resultsMenu', false);
    controller.set('taskSelected', false);
    controller.set('keyCount', 0);
    
    // Find out if we are currently allowing picks.
    this.store.findRecord('admin', 1).then(function(admin) {
      controller.set('allowPicks', admin.get('pre'));
    });
  } 
});
