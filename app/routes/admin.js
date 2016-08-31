import Ember from 'ember';
import QueryFilterMixinMixin from '../mixins/query-filter-mixin.js;';

export default Ember.Route.extend(QueryFilterMixinMixin, { 

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

    /*
      currentGames stores all of the games where both team1 and team2 have been determined.
      But no winner has been determined. This list is passed into the enter-results 
      component so the admin can see which a list of possible games to enter the results.
    */
    var season = '';
    this.store.findRecord('admin', 1).then(function(admin) {
      season = admin.get('season');
      console.log('are we getting here?');
    });
    this.store.query('game', {orderBy: 'season'}).then(function(games) {
      controller.set('gameList', games);
    });
  } 

});
