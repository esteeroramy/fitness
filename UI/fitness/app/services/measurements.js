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
                    minImage: get(item, 'minImage'),
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
        const imageData = yield this.get('compressImage').perform(photoData.image, 2000);
        const minImageData = yield this.get('compressImage').perform(photoData.image, 1000);

        try {
            let progressPhoto = this.store.createRecord('progress-photo', {
                notes: photoData.notes,
                date: new Date(),
                image: imageData,
                minImage: minImageData
            });

            const data = yield progressPhoto.save();

            const transformedData = {
                id: get(data, 'id'),
                notes: get(data, 'notes'),
                date: get(data, 'date'),
                minImage: get(data, 'minImage'),
                creatorId: get(data, 'creatorId')
            };

            this.set('photoData', [ transformedData ].concat(this.get('photoData') || []));

            return data;
        } catch (exception) {
            // error
        }
    }),

    compressImage: task(function* (base64, maxSize = 2000) {
        const canvas = document.createElement('canvas')
        const img = document.createElement('img')

        return yield new Promise((resolve, reject) => {
            img.onload = function () {
                let width = img.width
                let height = img.height
                const maxHeight = maxSize
                const maxWidth = maxSize

                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height *= maxWidth / width))
                        width = maxWidth
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width *= maxHeight / height))
                        height = maxHeight
                    }
                }
                canvas.width = width
                canvas.height = height

                const ctx = canvas.getContext('2d')
                ctx.drawImage(img, 0, 0, width, height)

                resolve(canvas.toDataURL('image/jpeg', 0.7))
            }

            img.onerror = function (err) {
                reject(err)
            }

            img.src = base64
        });
    })
});
