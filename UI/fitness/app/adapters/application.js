import config from 'fitness/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import DS from 'ember-data';
import { inject as service } from '@ember/service';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
    session: service(),

    authorizer: 'authorizer:oauth2',
    host: config.apiUrl,

    isInvalid(status, headers, payload) {
        if (status === 403) {
            this.get('session').invalidate();
        }

        payload.errors = [
            {
                code: payload.code,
                message: payload.message
            }
        ];

        this._super(status, headers, payload);
    }
});
