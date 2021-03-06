import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Service.extend({
    store: service(),
    session: service(),

    /**
     * Me data
     *
     * @param {Object}
     */
    me: null,

    /**
     * Gets the Me data for the logged in user
     */
    getMeCall: task(function* () {
        try {
            const data = yield this.get('store').findRecord('me', 0);

            this.set('me', data);
        } catch (exception) {
            // error
        }
    }).restartable()
});
