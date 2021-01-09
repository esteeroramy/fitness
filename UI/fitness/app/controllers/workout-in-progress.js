import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { task } from 'ember-concurrency';

export default Controller.extend({
    workoutInProgressRepository: service(),
    workoutRepository: service(),

    reset() {
        this.get('workoutInProgressRepository').cancelWorkout();
    },

    logworkout: task(function* (workoutLog) {
        yield this.get('workoutRepository.logWorkout').perform(workoutLog);
        this.reset();
        this.transitionToRoute('home');
    }),

    actions: {
        cancelWorkout() {
            this.get('workoutInProgressRepository').cancelWorkout();
            this.transitionToRoute('home');
        },

        startRestTimer(time, minTime) {
            this.get('workoutInProgressRepository').startRestTimer(time, minTime);
        },

        saveWorkout() {
            const workout = this.get('workoutInProgressRepository.workout');
            const exerciseProgress = this.get('workoutInProgressRepository.exerciseProgress');

            const workoutStartTime = this.get('workoutInProgressRepository.workoutStartTime');
            const currentTime = new Date();
            const durationInSeconds = Math.floor((currentTime.getTime() - workoutStartTime.getTime()) / 1000);

            const workoutLog = {
                workoutId: get(workout, 'id'),
                durationInSeconds,
                loggedDate: currentTime,
                configuration: {
                    exercises: exerciseProgress.map(exercise => {
                        return {
                            id: get(exercise, 'id'),
                            notes: get(exercise, 'notes'),
                            sets: get(exercise, 'sets').map(workSet => {
                                return {
                                    weight: get(workSet, 'weight'),
                                    reps: get(workSet, 'reps'),
                                    done: get(workSet, 'done')
                                };
                            })
                        };
                    })
                }
            };

            this.get('logworkout').perform(workoutLog);
        }
    }
});
