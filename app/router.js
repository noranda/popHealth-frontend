import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('users', function() {
    this.route('sign-in');
    this.route('sign-up');
    this.route('password', function() {
      this.route('new');
    });
  });
});

export default Router;
