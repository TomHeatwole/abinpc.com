import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('scores');
  this.route('picker');
  this.route('picks');
  this.route('records');
  this.route('rules');
  this.route('admin');
});

export default Router;
