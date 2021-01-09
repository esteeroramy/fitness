import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
    measurements: service(),

    setupController(controller) {
        if (this.get('measurements.photoData') === null) {
            controller.setup();
        }

        this._super(...arguments);
    },

    deactivate() {
        this.controller.reset();

        this._super(...arguments);
    }
});
