import Controller from '@ember/controller';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
    enums: service(),
    workoutInProgressRepository: service(),
    workoutRepository: service(),

    /**
     * If the workout overview modal is visible
     *
     * @type {Boolean}
     */
    isWorkoutOverviewModalVisible: false,

    /**
     * The selected workout
     *
     * @type {Object}
     */
    selectedWorkout: null,

    reset() {
        this.setProperties({
            isWorkoutOverviewModalVisible: false,
            selectedWorkout: null,
        });
    },

    actions: {
        openWorkout(workout) {
            this.setProperties({
                isWorkoutOverviewModalVisible: true,
                selectedWorkout: workout,
            });
        },

        openWorkoutInProgress(workout) {
            this.get('workoutInProgressRepository.resumeInProgressWorkout').perform(workout),
            this.send('transitionToWorkoutInProgress');
        },

        closeWorkoutOverviewModal() {
            this.setProperties({
                isWorkoutOverviewModalVisible: false,
                selectedWorkout: null,
            });
        },

        editWorkout(workout) {
            this.transitionToRoute('create-workout').then(function(newRoute) {
                newRoute.controller.setProperties({
                    workoutName: get(workout, 'name'),
                    exercises: get(workout, 'configuration.exercises'),
                    id: get(workout, 'id'),
                    isEditing: true
                });
            });
        },

        transitionToWorkoutInProgress() {
            this.transitionToRoute('workout-in-progress');
        }

    }
});
