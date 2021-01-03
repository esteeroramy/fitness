import Component from '@ember/component';

export default Component.extend({
    classNames: ['create-workout-exercise-editor'],

    /**
     * The exercise object being modified
     *
     * @type {Object}
     */
    exercise: null,

    actions: {
        addSet() {
            this.set('exercise.sets', (this.get('exercise.sets') || []).concat({
                minReps: null,
                maxReps: null,
                minRest: null,
                maxRest: null
            }));
        },

        deleteSet(index) {
            const sets = this.get('exercise.sets');
            this.set('exercise.sets', sets.slice(0, index).concat(sets.slice(index + 1, sets.length)));
        },

        deleteExercise() {
            this.onDeleteExercise(this.get('exercise'));
        }
    }
});
