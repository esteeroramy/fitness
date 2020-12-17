import DS from 'ember-data';
import { assign } from '@ember/polyfills';

export default DS.RESTSerializer.extend({
    serializeIntoHash(hash, type, record, options) {
        assign(hash, this.serialize(record, options));
    },

    normalizeResponse(store, primaryModelClass, payload, id, requestType) {
        let data;

        if (Array.isArray(payload)) {
            data = payload.map(record => {
                return {
                    id: record.id,
                    type: primaryModelClass.modelName,
                    attributes: record
                };
            });
        } else {
            data = {
              id: payload.id,
              type: primaryModelClass.modelName,
              attributes: payload
            };
        }

        return { data: data };
    }
});
