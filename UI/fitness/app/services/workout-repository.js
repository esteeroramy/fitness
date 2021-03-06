import Service from '@ember/service';
import { get, set, setProperties } from '@ember/object';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';
import { task } from 'ember-concurrency';

export default Service.extend({
    enums: service(),
    exerciseRepository: service(),
    historyRepository: service(),
    meRepository: service(),
    store: service(),
    workoutInProgressRepository: service(),

    /**
     * The list of workouts available
     *
     * @type {Array}
     */
    workouts: null,

    /**
     * The list of workouts in progress
     *
     * @type {Array}
     */
    workoutsInProgress: null,

    /**
     * Creates a workout
     */
    createWorkout: task(function* (workout) {
        const data = yield this.get('store').createRecord('workout', workout);
        yield data.save();

        yield this.get('getWorkouts').perform();
    }),

    /**
     * Edits a workout
     */
    editWorkout: task(function* (workoutObject) {
        const enums = this.get('enums');
        const workout = this.get('store').peekRecord('workout', get(workoutObject, 'id'));
        workout.set('name', get(workoutObject, 'name'));

        set(workout, 'data.configuration.exercises', get(workoutObject, 'configuration.exercises').map(exercise => {
            return {
                id: get(exercise, 'id'),
                sets: get(exercise, 'sets')
            };
        }));

        yield workout.save();

        yield this.get('getWorkouts').perform();
    }),

    deleteWorkout: task(function* (workoutId) {
        const workout = this.get('store').peekRecord('workout', workoutId);

        yield workout.destroyRecord();

        yield this.get('getWorkouts').perform();
    }),

    /**
     * Gets the list of workouts
     */
    getWorkouts: task(function* () {
        const enums = this.get('enums');
        const data = yield this.get('store').query('workout', {});
        const exercises = this.get('exerciseRepository.exercises');

        const transformedData = (data || []).map(workout => {
            return {
                id: get(workout, 'id'),
                isDeleted: get(workout, 'isDeleted'),
                creatorId: get(workout, 'creatorId'),
                name: get(workout, 'name'),
                workoutTypeKey: enums.getKeyByValue(enums.workoutTypes, workout.type),
                configuration: get(workout, 'configuration')
            }
        });

        transformedData.forEach(workout => {
            get(workout, 'configuration.exercises').forEach(exercise => {
                const exerciseDetails = exercises.find(item => get(item, 'id') === get(exercise, 'id'));

                if (isPresent(exerciseDetails)) {
                    setProperties(exercise, {
                        creatorId: get(exerciseDetails, 'creatorId'),
                        name: get(exerciseDetails, 'name'),
                        weight: get(exerciseDetails, 'weight'),
                        equipmentKey: enums.getKeyByValue(enums.exerciseEquipment, exerciseDetails.weight)
                    });
                }

                (get(exercise, 'sets') || []).forEach(exerciseSet => {
                    setProperties(exerciseSet, {
                        minRest: this.fromSecs(get(exerciseSet, 'minRestSecs')),
                        maxRest: this.fromSecs(get(exerciseSet, 'maxRestSecs'))
                    });
                });
            });
        });

        this.set('workouts', transformedData);

        // If there are workouts in progress
        if (this.get('meRepository.me.hasWorkoutsInProgress')) {
            const workoutsInProgress = yield this.get('store').query('workout-in-progress', {});
            this.set('workoutsInProgress', (workoutsInProgress || []).map(inProgressItem => {
                const workout = transformedData.find(item => get(item, 'id') === get(inProgressItem, 'workoutId'));

                return {
                    id: get(workout, 'id'),
                    isDeleted: get(workout, 'isDeleted'),
                    creatorId: get(workout, 'creatorId'),
                    name: get(workout, 'name'),
                    workoutTypeKey: get(workout, 'workoutTypeKey'),
                    configuration: get(workout, 'configuration'),
                    exerciseProgress: get(inProgressItem, 'exerciseProgress'),
                    workoutInProgressId: get(inProgressItem, 'id'),
                    workoutStartTime: get(inProgressItem, 'workoutStartTime')
                };
            }));
        }

        return transformedData;
    }),

    /**
     * Logs a workout
     *
     * @param {Object} workout
     */
    logWorkout: task(function* (workoutLog) {
        const data = yield this.get('store').createRecord('workoutlog', workoutLog);
        yield data.save();
        this.get('historyRepository.refreshList').perform();
        this.get('workoutInProgressRepository.removeInProgressWorkoutRequest').perform();
    }),

    getLastLoggedWorkout: task(function* (workoutId) {
        const data = yield this.get('store').findRecord('workoutlog', workoutId, { reload: true });

        if (get(data, 'id') === '-1') {
            return null;
        }

        return data;
    }),

    updateWorkoutsInProgress: task(function* () {
        const data = yield this.get('store').peekAll('workout-in-progress');
        const workouts = this.get('workouts');

        this.set('workoutsInProgress', (data || []).map(inProgressItem => {
            const workout = workouts.find(item => get(item, 'id') === get(inProgressItem, 'workoutId'));

            return {
                id: get(workout, 'id'),
                isDeleted: get(workout, 'isDeleted'),
                creatorId: get(workout, 'creatorId'),
                name: get(workout, 'name'),
                workoutTypeKey: get(workout, 'workoutTypeKey'),
                configuration: get(workout, 'configuration'),
                exerciseProgress: get(inProgressItem, 'exerciseProgress'),
                workoutInProgressId: get(inProgressItem, 'id'),
                workoutStartTime: get(inProgressItem, 'workoutStartTime')
            };
        }));
    }),

    /**
     * Converts user time to seconds
     *
     * @param {String} time
     */
    toSecs(time) {
        if (!isPresent(time)) {
            time = ''
        }

        var split = time.split(':');

        if (split.length === 1) {
            return +split[0];
        } else if (split.length == 2) {
            return (+split[0]) * 60 + (+split[1]);
        }

        return 0
    },

    /**
     * Converts seconds to user time
     *
     * @param {String} time
     */
    fromSecs(time) {
        if (!isPresent(time) || time === '') {
            return '';
        }

        time = parseInt(time);
        let mins = Math.floor(time / 60);
        let secs = time % 60;

        if (mins === 0) {
            return secs.toString();
        }

        secs = (secs < 10) ? '0' + secs : secs;
        return mins + ':' + secs;
    }
});
