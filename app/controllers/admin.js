import Ember from 'ember';

export default Ember.Controller.extend({

  correctPassword: false,
  incorrectPassword: false,
  enteredPassword: '',
  
  keysMenu: false,
  seasonMenu: false, 
  resultsMenu: false,
  taskSelected: false,
  newKeys: [],

  keyCount: 0,
  allowPicks: false,

  gameList: [],

  /*
    It's not completely neccessary to hash the password since the current backend (Google firebase)
    is temporary and not even a little bit secure as it is. If anybody has the URL to my database, 
    they can competely ruin my app in no time. I just felt too weird hardcoding the actual password
    in the public database. In reality storing the hash is hardly any safer, but I suppose it's good
    practice. Once again, the current backend is temporary anyway. This is the has function.
  */

  hash: function(str) {
    var hash = 0;
    if (str.length === 0) {
      return hash;
    }
    for (var i = 0; i < str.length; i++) {
        var char1 = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char1;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  },
 
  makeKey: function() { 
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for( var i=0; i < 8; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
  },

  actions: {
    submitPassword() {
      var self = this;
      this.store.findRecord('admin', 1).then(function(admin) {
        var hash = admin.get('hash');
        if (self.get('enteredPassword') !== '') {
          if (self.hash(self.get('enteredPassword')) === hash) {
	    self.set('correctPassword', true);
          } else {
	    self.set('incorrectPassword', true);
          }
        }
      });
    },
    
    newSeasonOn() {
      this.set('keysMenu', false);
      this.set('resultsMenu', false);
      this.set('seasonMenu', true);
      this.set('taskSelected', true);
    },

    enterResultsOn() {
      this.set('keysMenu', false);
      this.set('resultsMenu', true);
      this.set('seasonMenu', false);
      this.set('taskSelected', true);
    },

    generateKeysOn() {
      this.set('keysMenu', true);
      this.set('resultsMenu', false);
      this.set('seasonMenu', false);
      this.set('taskSelected', true);
      this.set('newKeys', []);
    },

    generate() {
      var self = this;
      var newKeys = [];
      for (var i = 0; i < this.get('keyCount'); i++) {
        var key = this.store.createRecord('key');
	var accessKey = self.makeKey();
	newKeys.push(accessKey);
	key.set('accessKey', accessKey);
	key.save(); 
      }
      this.set('newKeys', newKeys);
    },

    startAllowingPicks() {      
      this.store.findRecord('admin', 1).then(function(admin) {
	admin.set('pre', true);
	admin.save();
      });
      this.set('allowPicks',true);
      window.alert('Picks are now allowed for the current season.');
    },

    stopAllowingPicks() {
      this.store.findRecord('admin', 1).then(function(admin) {
	admin.set('pre', false);
	admin.save();
      });
      this.set('allowPicks', false);
      window.alert('You have disabled picking for the current season.');
    },

    backToTasks() { 
      this.set('keysMenu', false);
      this.set('resultsMenu', false);
      this.set('seasonMenu', false);
      this.set('taskSelected', false);
      this.set('keyCount', 0);
    }
  }
});
