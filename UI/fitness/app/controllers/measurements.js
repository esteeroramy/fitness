import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Controller.extend({
    enums: service(),
    measurements: service(),

    /**
     * If adding a picture is enabled
     *
     * @type {Boolean}
     */
    isAddingPicture: false,

    /**
     * The selected image
     *
     * @type {Object}
     */
    image: null,

    /**
     * Notes on the image
     *
     * @type {String}
     */
    notes: '',

    /**
     * The list of photos to be displayed
     *
     * @type {Array}
     */
    allPhotos: computed('measurements.photoData.[]', function() {
        return (this.get('measurements.photoData') || []).map(item => {
            const image = new Image();
            image.src = `data:image/png;base64,${item.image}`;
            let date = new Date(Date.parse(item.date));

            return {
                src: `data:image/png;base64,${item.image}`,
                w: image.width,
                h: image.height,
                title: date.toDateString(),
                notes: item.notes
            };
        });
    }).readOnly(),

    getAllPhotos: task(function* () {
        try {
            const data = yield this.get('measurements.getAllPhotos').perform();

            return data;
        } catch {
            //error
        }
    }),

    createProgressPhoto: task(function* () {
        try {
            const data = yield this.get('measurements.createProgressPhoto').perform({
                image: this.get('image'),
                notes: this.get('notes')
            });

            this.send('closeAddPictureSection');

            return data;
        } catch {

        }
    }),

    setup() {
        this.get('getAllPhotos').perform();
    },

    reset() {
        this.setProperties({
            isAddingPicture: false,
            image: null,
            notes: ''
        });
    },

    actions: {
        uploadFile(event) {
            const reader = new FileReader();
            const file = event.target.files[0];

            reader.onload = () => {
                this.set('image', reader.result);
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        },

        createUser(event) {
            event.preventDefault();

            this.get('createProgressPhoto').perform();
        },

        openAddPictureSection() {
            this.set('isAddingPicture', true);
        },

        closeAddPictureSection() {
            this.setProperties({
                isAddingPicture: false,
                image: null,
                notes: ''
            });
        }
    }
});
