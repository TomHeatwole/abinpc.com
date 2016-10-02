import Ember from 'ember';

export default Ember.Route.extend({
  
  model() {
    return this.store.createRecord('player');
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('ASelected',false);
    controller.set('BSelected',false);
    controller.set('CSelected',false);
    controller.set('DSelected',false);
    controller.set('FSelected',false);
    controller.set('ACompleted',false);
    controller.set('BCompleted',false);
    controller.set('CCompleted',false);
    controller.set('DCompleted',false);
    controller.set('noneSelected',true);
    var map = {};
    var self=this;
    this.store.findRecord('admin', 1).then(function(admin) {
      controller.set('allowPicks', admin.get('pre')); 

      self.store.findAll('teamset').then(function(sets){
	sets.forEach(function(set) {
	  if (set.get('season') === admin.get('season')) {
	    var region = "A";
	    var code = "";
	    for (var i = 0; i < 64; i++) {
	      if (i === 16) {
		region = "B";
	      } 
              if (i === 32) {
		region = "C";
	      }
	      if (i === 48) {
	  	region = "D";
              }
	      code = region + (i%16 + 1); 
	      map[code] = set.get(code);
	      if (code === "D16") {
		controller.set('teamNameMap', map);
	      }
	    }
	  }
	});
      });

      self.store.findAll('regionset').then(function(sets) {
	sets.forEach(function(set) {
	  if (set.get('season') === admin.get('season')) {
	    controller.set('AName', set.get('A'));
	    controller.set('BName', set.get('B'));
	    controller.set('CName', set.get('C'));
	    controller.set('DName', set.get('D'));
	  }
	});
      });
    });
  }
});
