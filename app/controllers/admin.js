import Ember from 'ember';

export default Ember.Controller.extend({

  correctPassword: false,
  incorrectPassword: false,
  enteredPassword: '',
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

  actions: {
    submitPassword() {
      var self = this;
      this.store.findRecord('admin-password', 'pass1').then(function(adminPassword) {
        var hash = adminPassword.get('hash');
        if (self.get('enteredPassword') != '') {
          if (self.hash(self.get('enteredPassword')) === hash) {
	    self.set('correctPassword', true);
          } else {
	    self.set('incorrectPassword', true);
          }
        }
      });
    }
  }  
});
