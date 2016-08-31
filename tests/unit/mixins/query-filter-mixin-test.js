import Ember from 'ember';
import QueryFilterMixinMixin from 'abinpc/mixins/query-filter-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | query filter mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let QueryFilterMixinObject = Ember.Object.extend(QueryFilterMixinMixin);
  let subject = QueryFilterMixinObject.create();
  assert.ok(subject);
});
