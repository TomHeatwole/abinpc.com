import Ember from 'ember';

/*
  I had to create this mixin because the tool I'm using to connect Ember to Firebase (EmberFire)
  was depracated before it was fully developed. For this reason, there are some methods in the
  ember store that don't work with the intended functionality of the store. One of these methods,
  'filter' is vital to this application. This mixin is designed to work as a filter for queries.
  It will pull every instance of the object from the database, then use paramaters passed to
  filter out unneeded data. 
*/

export default Ember.Mixin.create({


  // param: model - string - name of the model that should be querried
  // param: attributes - array - names of the attributes that should be filtered by
  // param: values - array - required values of the filtered attributes
  // **Position in attributes array corresponds with values array**


  filterQuery: function(model, attributes, values) { 
    console.log('hello world');
  }
});
