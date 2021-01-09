import Component from '@ember/component';
import { get, set } from '@ember/object';

export default Component.extend({
    classNames: ['workout-in-progress-exercise-editor'],

    /**
     * The exercise object in progress
     *
     * @type {Object}
     */
    exercise: null,

    /**
     * If the notes section is visible
     *
     * @type {Boolean}
     */
    isNotesVisible: false,

    actions: {
        toggleSet(workoutSet) {
            const isDone = !get(workoutSet, 'done');
            set(workoutSet, 'done', isDone);

            if (isDone) {
                if (get(workoutSet, 'maxRestSecs') > 0) {
                    this.onStartRestTimer(get(workoutSet, 'maxRestSecs'), get(workoutSet, 'minRestSecs'));
                } else if (get(workoutSet, 'minRestSecs') > 0) {
                    this.onStartRestTimer(get(workoutSet, 'minRestSecs'));
                }
            }
        },

        addComment() {
            this.set('isNotesVisible', true);
        },

        deleteComment() {
            this.setProperties({
                isNotesVisible: false,
                'exercise.notes': ''
            });
        }
    }
});
