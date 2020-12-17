import Service from '@ember/service';
import { get, set, setProperties } from '@ember/object';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';
import { task } from 'ember-concurrency';

export default Service.extend({
    enums: service(),
    exerciseRepository: service(),
    historyRepository: service(),
    store: service(),

    /**
     * The list of workouts available
     *
     * @type {Array}
     */
    workouts: null,

    /**
     * Creates a workout
     */
    createWorkout: task(function* (workout) {
        const enums = this.get('enums');
        const data = yield this.get('store').createRecord('workout', workout);
        const savedData = yield data.save();
        const exercises = this.get('exerciseRepository.exercises');

        const transformedData = {
            id: get(savedData, 'id'),
            creatorId: get(savedData, 'creatorId'),
            name: get(savedData, 'name'),
            workoutTypeKey: enums.getKeyByValue(enums.workoutTypes, savedData.type),
            configuration: get(savedData, 'configuration')
        };

        get(transformedData, 'configuration.exercises').forEach(exercise => {
            const exerciseDetails = exercises.find(item => get(item, 'id') === get(exercise, 'id'));

            setProperties(exercise, {
                creatorId: get(exerciseDetails, 'creatorId'),
                name: get(exerciseDetails, 'name'),
                weight: get(exerciseDetails, 'weight'),
                equipmentKey: enums.getKeyByValue(enums.exerciseEquipment, exerciseDetails.weight)
            });

            (get(exercise, 'sets') || []).forEach(exerciseSet => {
                setProperties(exerciseSet, {
                    minRest: this.fromSecs(get(exerciseSet, 'minRestSecs')),
                    maxRest: this.fromSecs(get(exerciseSet, 'maxRestSecs'))
                });
            });
        });

        this.set('workouts', this.get('workouts').concat(transformedData));

        return transformedData;
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

        const savedData = yield workout.save();
        const exercises = this.get('exerciseRepository.exercises');

        const transformedData = {
            id: get(savedData, 'id'),
            creatorId: get(savedData, 'creatorId'),
            name: get(savedData, 'name'),
            workoutTypeKey: enums.getKeyByValue(enums.workoutTypes, savedData.type),
            configuration: get(savedData, 'configuration')
        };

        get(transformedData, 'configuration.exercises').forEach(exercise => {
            const exerciseDetails = exercises.find(item => get(item, 'id') === get(exercise, 'id'));

            setProperties(exercise, {
                creatorId: get(exerciseDetails, 'creatorId'),
                name: get(exerciseDetails, 'name'),
                weight: get(exerciseDetails, 'weight'),
                equipmentKey: enums.getKeyByValue(enums.exerciseEquipment, exerciseDetails.weight)
            });

            (get(exercise, 'sets') || []).forEach(exerciseSet => {
                setProperties(exerciseSet, {
                    minRest: this.fromSecs(get(exerciseSet, 'minRestSecs')),
                    maxRest: this.fromSecs(get(exerciseSet, 'maxRestSecs'))
                });
            });
        });

        const index = this.get('workouts').findIndex(item => item.id === transformedData.id)

        if (index !== -1) {
            this.get('workouts')[index] = transformedData;
        }

        return transformedData;
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
    }),

    getLastLoggedWorkout: task(function* (workoutId) {
        const data = yield this.get('store').findRecord('workoutlog', workoutId, { reload: true });

        if (get(data, 'id') === '-1') {
            return null;
        }

        return data;
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
