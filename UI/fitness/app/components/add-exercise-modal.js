import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';

export default Component.extend({
    exerciseRepository: service(),

    /**
     * The list of exercises available
     *
     * @type {Array}
     */
    exercises: null,

    /**
     * The list of exercises selected
     *
     * @type {Array}
     */
    selectedExercises: null,

    /**
     * If the modal is visible
     *
     * @type {Boolean}
     */
    isModalVisible: false,

    /**
     * If the create exercise modal is visible
     *
     * @type {Boolean}
     */
    isCreateExerciseModalVisible: false,

    /**
     * The search filter
     *
     * @type {String}
     */
    searchFilter: '',

    /**
     * The exercises to display based on the filter
     *
     * @type {Aray}
     */
    exercisesToDisplay: computed('searchFilter', 'exercises.[]', 'selectedExercises.[]', function() {
        const filter = this.get('searchFilter').toLowerCase();
        const selectedExercises = this.get('selectedExercises') || [];

        return this.get('exercises')
            .filter(exercise => exercise.name.toLowerCase().includes(filter))
            .map(exercise => {
                return {
                    id: get(exercise, 'id'),
                    creatorId: get(exercise, 'creatorId'),
                    name: get(exercise, 'name'),
                    weight: get(exercise, 'weight'),
                    equipmentKey: get(exercise, 'equipmentKey'),
                    isSelected: isPresent(selectedExercises.find(item => item.id === exercise.id))
                };
            }).sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
    }).readOnly(),

    /**
     * If the add button is enabled
     *
     * @type {Boolean}
     */
    isAddButtonEnabled: computed('selectedExercises', 'selectedExercises.[]', function() {
        const selectedExercises = this.get('selectedExercises');
        return (selectedExercises || []).length > 0;
    }).readOnly(),

    actions: {
        openCreateExerciseModal() {
            this.set('isCreateExerciseModalVisible', true);
        },

        closeCreateExerciseModal() {
            this.set('isCreateExerciseModalVisible', false);
        },

        addSavedExercise(exercise) {
            this.set('selectedExercises', (this.get('selectedExercises') || []).concat(exercise));
        },

        toggleSelectExercise(exercise) {
            const selectedExercises = this.get('selectedExercises') || [];
            const index = selectedExercises.findIndex(item => item.id === exercise.id)

            if (index >= 0) {
                this.set('selectedExercises', selectedExercises.slice(0, index).concat(selectedExercises.slice(index + 1, selectedExercises.length)));
            } else {
                this.set('selectedExercises', selectedExercises.concat(exercise));
            }
        },

        addExercises() {
            this.onSave(this.get('selectedExercises'));
            this.send('closeModal');
        },

        closeModal() {
            this.setProperties({
                searchFilter: '',
                isCreateExerciseModalVisible: false,
                selectedExercises: null
            });

            this.onClose();
        }
    }
});
