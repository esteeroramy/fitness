import Service from '@ember/service';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';
import { later } from '@ember/runloop';
import { task } from 'ember-concurrency';

export default Service.extend({
    intl: service(),
    store: service(),
    workoutRepository: service(),

    workout: null,
    exerciseProgress: null,
    restTimeEnabled: false,
    restStartTime: null,
    restTimeLeft: '',
    restDuration: 0,
    restPercentageLeft: 0,
    minRestDuration: 0,
    isRestTimeGreen: false,
    workoutStartTime: null,
    workoutElapsedTime: '',

    startWorkout: task(function* (workout) {
        const previous = yield this.get('workoutRepository.getLastLoggedWorkout').perform(get(workout, 'id'));

        this.set('workout', workout);

        this.set('exerciseProgress', (get(workout, 'configuration.exercises') || []).map(exercise => {
            const previousExercise = isPresent(previous) ?
                (get(previous, 'configuration.exercises') || []).find(pExercise => pExercise.id === exercise.id) :
                null;

            return {
                id: get(exercise, 'id'),
                name: get(exercise, 'name'),
                equipmentKey: get(exercise, 'equipmentKey'),
                oldNotes: isPresent(previousExercise) ?
                    (get(previousExercise, 'notes') || '') :
                    '',
                notes: '',
                sets: (get(exercise, 'sets') || []).map((set, index) => {
                    const previousSet = isPresent(previousExercise) ?
                        (get(previousExercise, 'sets') || [])[index] :
                        null;

                    return {
                        previous: isPresent(previousSet) && get(previousSet, 'done') ?
                            `${get(previousSet, 'weight')} ${this.get('intl').t('weightUnits.lb')} x ${get(previousSet, 'reps')}` :
                            '-',
                        weight: '',
                        reps: '',
                        minReps: get(set, 'minReps'),
                        maxReps: get(set, 'maxReps'),
                        repsPlaceholder: get(set, 'maxReps') ? `${get(set, 'minReps')} - ${get(set, 'maxReps')}`: `${get(set, 'minReps')}`,
                        minRestSecs: get(set, 'minRestSecs'),
                        maxRestSecs: get(set, 'maxRestSecs'),
                        done: false
                    };
                })
            };
        }));

        this.startWorkoutTimer();
    }),

    startWorkoutTimer() {
        this.set('workoutStartTime', new Date());
        this.runWorkoutTimer();
    },

    runWorkoutTimer() {
        later(this, function() {
            const workoutStartTime = this.get('workoutStartTime');
            const currentTime = new Date();

            if (isPresent(workoutStartTime)) {
                const elapsedTime = this.msToTime(currentTime.getTime() - workoutStartTime.getTime());
                this.set('workoutElapsedTime', elapsedTime);
                this.runWorkoutTimer();
            }
        }, 100);
    },

    startRestTimer(restDuration, minDuration) {
        this.setProperties({
            restStartTime: new Date(),
            restDuration: (restDuration + 1) * 1000,
            minRestDuration: (minDuration + 1) * 1000,
            restTimeEnabled: true
        });

        this.runRestTimer();
    },

    runRestTimer() {
        later(this, function() {
            const restStartTime = this.get('restStartTime');
            const restDuration = this.get('restDuration');
            const currentTime = new Date();
            let remainingTime;

            if (isPresent(restStartTime)) {
                remainingTime = restDuration + restStartTime.getTime() - currentTime.getTime();
            } else {
                remainingTime = 0;
            }

            const timeLeft = this.msToTime(remainingTime);

            if (remainingTime <= 0) {
                this.setProperties({
                    restTimeEnabled: false,
                    restStartTime: null,
                    restTimeLeft: '',
                    restDuration: 0,
                    restPercentageLeft: 0,
                    minRestDuration: 0,
                    isRestTimeGreen: false
                });
            } else {
                const minRestDuration = this.get('minRestDuration');
                let isRestTimeGreen = false;
                if (remainingTime < (restDuration - minRestDuration)) {
                    isRestTimeGreen = true;
                }

                this.setProperties({
                    restTimeLeft: timeLeft,
                    restPercentageLeft: (remainingTime / restDuration) * 100,
                    isRestTimeGreen
                });
                this.runRestTimer();
            }
        }, 100);
    },

    cancelWorkout() {
        this.setProperties({
            workout: null,
            exerciseProgress: null,
            restTimeEnabled: false,
            restStartTime: null,
            restTimeLeft: '',
            restDuration: 0,
            restPercentageLeft: 0,
            minRestDuration: 0,
            isRestTimeGreen: false,
            workoutStartTime: null,
            workoutElapsedTime: '',
        });

        this.get('store').unloadAll('workoutlog');
    },

    msToTime(duration) {
        let seconds = Math.floor((duration / 1000) % 60);
        let minutes = Math.floor((duration / (1000 * 60)) % 60);
        let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        seconds = (seconds < 10) ? "0" + seconds : seconds;

        if (hours === 0) {
            return minutes + ":" + seconds;
        }

        minutes = (minutes < 10) ? "0" + minutes : minutes;

        return hours + ":" + minutes + ":" + seconds;
    }
});
