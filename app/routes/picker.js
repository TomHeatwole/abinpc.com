import Ember from 'ember';

export default Ember.Route.extend({
  
  model() {
    var m = this.store.createRecord('player');
    for (var i = 1; i < 64; i++) {
      m.set('pick' + i, 'TBD');
    }
    return m;
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
    var map1 = {};
    var map2 = {};
    var self=this;
    this.store.findRecord('admin', 1).then(function(admin) {
      controller.set('allowPicks', admin.get('pre')); 
      controller.set('loading', false);
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
	      map1[code] = '' + (i%16 + 1) + '. '+ set.get(code); //Eaxmple: map[A1] = 1. Kentucky
	      map2['' + (i%16 + 1) + '. '+ set.get(code)] = code; //Example: map[1. Kentucky] = A1
	      if (code === "D16") {
		controller.set('teamNameMap', map1);
		controller.set('teamCodeMap', map2);
	      }
	    }
	  }
	});
      });
      
      var keySet = {};
      var count = 0;
      self.store.findAll('key').then(function(keys) {
	keys.forEach(function(key) {
	  keySet[count] = (key.get('accessKey'));
	  count++;
	});
      });
      controller.set('accessKeys', keySet);

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
      controller.set('season', admin.get('season'));
    });
  }
});
