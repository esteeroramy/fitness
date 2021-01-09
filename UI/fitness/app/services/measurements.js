import Service from '@ember/service';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Service.extend({
    store: service(),

    /**
     * The photos list
     *
     * @type {Array}
     */
    photoData: null,

    /**
     * Gets all photos
     */
    getAllPhotos: task(function* () {
        try {
            const data = yield this.store.query('progress-photo', {});

            const transformedData = data.map(item => {
                return {
                    id: get(item, 'id'),
                    notes: get(item, 'notes'),
                    date: get(item, 'date'),
                    image: get(item, 'image'),
                    creatorId: get(item, 'creatorId')
                };
            });

            this.set('photoData', transformedData);

            return transformedData;
        } catch (exception) {
            // error
        }
    }),

    /**
     * Creates a progress photo
     */
    createProgressPhoto: task(function* (photoData) {
        try {
            let progressPhoto = this.store.createRecord('progress-photo', {
                notes: photoData.notes,
                date: new Date(),
                image: photoData.image
            });

            const data = yield progressPhoto.save();

            const transformedData = {
                id: get(data, 'id'),
                notes: get(data, 'notes'),
                date: get(data, 'date'),
                image: get(data, 'image'),
                creatorId: get(data, 'creatorId')
            };

            this.set('photoData', [ transformedData ].concat(this.get('photoData') || []));

            return data;
        } catch (exception) {
            // error
        }
    })

});
