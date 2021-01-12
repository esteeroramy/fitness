import Service from '@ember/service';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { isEmpty, isPresent } from '@ember/utils';
import { later } from '@ember/runloop';
import { task, timeout } from 'ember-concurrency';

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

    inProgressId: null,

    saveInProgressWorkout: task(function* (configuration) {
        yield timeout(5000);

        this.get('saveInProgressWorkoutRequest').perform(configuration);
    }).restartable(),

    saveInProgressWorkoutRequest: task(function* (configuration, isNew = false) {
        const filteredExerciseProgress = (get(configuration, 'exerciseProgress') || []).map(item => {
            return {
                id: get(item, 'id'),
                notes: get(item, 'notes'),
                sets: (get(item, 'sets') || []).map(itemSet => {
                    return {
                        done: get(itemSet, 'done'),
                        reps: get(itemSet, 'reps'),
                        weight: get(itemSet, 'weight')
                    };
                })
            };
        });

        if (isNew) {
            const data = yield this.get('store').createRecord('workout-in-progress', {
                workoutId: get(configuration, 'workoutId'),
                workoutStartTime: get(configuration, 'workoutStartTime'),
                exerciseProgress: filteredExerciseProgress
            });
            const result = yield data.save();

            this.set('inProgressId', get(result, 'id'));
        } else {
            let data = yield this.get('store').peekRecord('workout-in-progress', this.get('inProgressId'));

            if (!isPresent(data)) {
                data = yield this.get('store').findRecord('workout-in-progress', this.get('inProgressId'));
            }

            set(data, 'exerciseProgress', filteredExerciseProgress);
            yield data.save();
        }

        yield this.get('workoutRepository.updateWorkoutsInProgress').perform();
    }),

    removeInProgressWorkoutRequest: task(function* () {
        this.get('saveInProgressWorkout').cancelAll();
        this.get('saveInProgressWorkoutRequest').cancelAll();

        if (isPresent(this.get('inProgressId'))) {
            let data = yield this.get('store').peekRecord('workout-in-progress', this.get('inProgressId'));

            if (!isPresent(data)) {
                data = yield this.get('store').findRecord('workout-in-progress', this.get('inProgressId'));
            }

            yield data.destroyRecord();
            yield this.get('workoutRepository.updateWorkoutsInProgress').perform();
        }
    }),

    resumeInProgressWorkout: task(function* (workout) {
        this.set('inProgressId', get(workout, 'workoutInProgressId'));

        const previous = yield this.get('workoutRepository.getLastLoggedWorkout').perform(get(workout, 'id'));

        this.set('workout', {
            configuration: get(workout, 'configuration'),
            id: get(workout, 'id'),
            isDeleted: get(workout, 'isDeleted'),
            name: get(workout, 'name'),
            workoutTypeKey: get(workout, 'workoutTypeKey')
        });

        const exerciseProgress = (get(workout, 'configuration.exercises') || []).map(exercise => {
            const previousExercise = isPresent(previous) ?
                (get(previous, 'configuration.exercises') || []).find(pExercise => pExercise.id === exercise.id) :
                null;

            const savedExerciseProgress = (get(workout, 'exerciseProgress') || []).find(exerciseProgressItem => exerciseProgressItem.id === exercise.id);

            return {
                id: get(exercise, 'id'),
                name: get(exercise, 'name'),
                equipmentKey: get(exercise, 'equipmentKey'),
                oldNotes: isPresent(previousExercise) ?
                    (get(previousExercise, 'notes') || '') :
                    '',
                notes: get(savedExerciseProgress, 'notes'),
                isNotesVisible: !isEmpty(get(savedExerciseProgress, 'notes')),
                sets: (get(exercise, 'sets') || []).map((set, index) => {
                    const previousSet = isPresent(previousExercise) ?
                        (get(previousExercise, 'sets') || [])[index] :
                        null;

                    return {
                        previous: isPresent(previousSet) && get(previousSet, 'done') ?
                            `${get(previousSet, 'weight')} ${this.get('intl').t('weightUnits.lb')} x ${get(previousSet, 'reps')}` :
                            '-',
                        weight: get(savedExerciseProgress, 'sets')[index].weight,
                        reps: get(savedExerciseProgress, 'sets')[index].reps,
                        minReps: get(set, 'minReps'),
                        maxReps: get(set, 'maxReps'),
                        repsPlaceholder: get(set, 'maxReps') ? `${get(set, 'minReps')} - ${get(set, 'maxReps')}`: `${get(set, 'minReps')}`,
                        minRestSecs: get(set, 'minRestSecs'),
                        maxRestSecs: get(set, 'maxRestSecs'),
                        done: get(savedExerciseProgress, 'sets')[index].done
                    };
                })
            };
        });

        this.set('exerciseProgress', exerciseProgress);

        this.set('workoutStartTime', new Date(Date.parse(get(workout, 'workoutStartTime'))));
        this.runWorkoutTimer();
    }),

    startWorkout: task(function* (workout) {
        const workoutId = get(workout, 'id');
        const previous = yield this.get('workoutRepository.getLastLoggedWorkout').perform(workoutId);

        this.set('workout', workout);

        const exerciseProgress = (get(workout, 'configuration.exercises') || []).map(exercise => {
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
        });

        this.set('exerciseProgress', exerciseProgress);

        this.startWorkoutTimer();

        this.get('saveInProgressWorkoutRequest').perform({
            workoutId,
            workoutStartTime: this.get('workoutStartTime'),
            exerciseProgress
        }, true);
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
