import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
    enums: service(),
    exerciseRepository: service(),
    intl: service(),

    /**
     * If the modal is visible
     *
     * @type {Boolean}
     */
    isModalVisible: false,

    /**
     * If selecting equipment is visible
     *
     * @type {Boolean}
     */
    isSelectingEquipment: false,

    /**
     * The name of the exercise
     *
     * @type {String}
     */
    exerciseName: '',

    /**
     * The selected equipment
     *
     * @type {String}
     */
    selectedEquipment: null,

    /**
     * The list of equipment to be displayed to the user
     *
     * @type {Array}
     */
    equipmentOptions: computed(function() {
        return Object.entries(this.get('enums.exerciseEquipment')).map(item => {
            return {
                key: item[0],
                name: this.get('intl').t(`exerciseEquipment.${item[0]}`)
            };
        });
    }),

    /**
     * The selected equipment text
     *
     * @type {String}
     */
    selectedEquipmentText: computed('selectedEquipment', function() {
        const selectedEquipment = this.get('selectedEquipment');

        if (selectedEquipment == null) {
            return this.get('intl').t('common.none');
        }

        return this.get('intl').t(`exerciseEquipment.${selectedEquipment}`);
    }),

    /**
     * Creates an exercise
     */
    createExercise: task(function* () {
        const exercise = {
            name: this.get('exerciseName'),
            weight: this.get(`enums.exerciseEquipment.${this.get('selectedEquipment')}`)
        };

        try {
            const data = yield this.get('exerciseRepository.createExercise').perform(exercise);

            this.send('addSavedExercise', data);
        } catch {

        }
    }),

    actions: {
        save() {
            this.get('createExercise').perform();
        },

        showSelectEquipment() {
            this.set('isSelectingEquipment', true);
        },

        hideSelectEquipment() {
            this.set('isSelectingEquipment', false);
        },

        selectEquipment(selectedEquipment) {
            this.setProperties({
                isSelectingEquipment: false,
                selectedEquipment
            });
        },

        addSavedExercise(exercise) {
            this.onAddSavedExercise(exercise);
            this.send('closeModal');
        },

        closeModal() {
            this.setProperties({
                isSelectingEquipment: false,
                exerciseName: '',
                selectedEquipment: null
            });

            this.onClose();
        }
    }
});
