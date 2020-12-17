import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | measurements', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:measurements');
    assert.ok(route);
  });
});
