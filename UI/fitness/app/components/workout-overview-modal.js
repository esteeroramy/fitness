import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    workoutInProgressRepository: service(),

    /**
     * If the modal is visible
     *
     * @type {Boolean}
     */
    isModalVisible: false,

    /**
     * Selected workout
     *
     * @type {Object}
     */
    workout: null,

    actions: {
        closeModal() {
            this.onClose();
        },

        editWorkout() {
            this.onEditWorkout(this.get('workout'));
        },

        startWorkout() {
            this.get('workoutInProgressRepository.startWorkout').perform(this.get('workout')),
            this.onTransitionToWorkoutInProgress();
        }
    }
});
