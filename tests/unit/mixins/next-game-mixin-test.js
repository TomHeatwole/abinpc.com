import Ember from 'ember';
import NextGameMixinMixin from 'abinpc/mixins/next-game-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | next game mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let NextGameMixinObject = Ember.Object.extend(NextGameMixinMixin);
  let subject = NextGameMixinObject.create();
  assert.ok(subject);
});
