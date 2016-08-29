import DS from 'ember-data';

export default DS.Model.extend({
  /*
  This model will be used to store keys that have not yet been linked to a player.
  When someone wants to make picks, they will request an accessKey, which they will
  then use to make their picks. The key will be deleted once the picks have been 
  entered. 

  This is to keep in my abinpc's user base. While most people in the 21st century
  would be completely ok with creating an account and logging in, abinpc has some
  users who are barely comfortable sending emails. This accessKey systenm is meant
  to limit users to one set of picks while still accommodating for users who are
  not necessarily good with computers.
  */
  accessKey: Ds.attr('string')
});
