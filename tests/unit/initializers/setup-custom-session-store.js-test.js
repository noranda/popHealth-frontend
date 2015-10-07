import Ember from 'ember';
import { initialize } from '../../../initializers/setup-custom-session-store.js';
import { module, test } from 'qunit';

var registry, application;

module('Unit | Initializer | setup custom session store.js', {
  beforeEach: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      registry = application.registry;
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  initialize(registry, application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
