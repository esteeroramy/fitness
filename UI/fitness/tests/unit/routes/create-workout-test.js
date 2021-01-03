import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | create-workout', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:create-workout');
    assert.ok(route);
  });
});
