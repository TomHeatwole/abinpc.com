import Ember from 'ember';
import QueryFilterMixiMixinn from 'abinpc/mixins/query-filter-mixin';

/*
  Like the new-season component, although this component is only used once, I chose to implement
  it as a component for organizational purposes in the admin controller.
*/

export default Ember.Component.extend(QueryFilterMixinMixin, {
  init: function() {
    this._super();
    console.log('hello world!! :D :D :D :D');
  },
  actions: {
    updateSelection() {
      console.log('when does this run?');
    }
  }
});
