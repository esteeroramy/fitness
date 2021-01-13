import Component from '@ember/component';

export default Component.extend({
    classNames: ['create-workout-exercise-editor'],

    /**
     * The exercise object being modified
     *
     * @type {Object}
     */
    exercise: null,

    /**
     * The index in the list
     *
     * @type {Number}
     */
    index: 0,

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
        },

        moveUp() {
            this.onMoveUp(this.get('index'));
        },

        moveDown() {
            this.onMoveDown(this.get('index'));
        }
    }
});
