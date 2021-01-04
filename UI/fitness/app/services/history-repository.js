import Service from '@ember/service';
import { get, setProperties } from '@ember/object';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';
import { task } from 'ember-concurrency';

export default Service.extend({
    enums: service(),
    exerciseRepository: service(),
    store: service(),
    workoutRepository: service(),

    /**
     * All of the history items
     *
     * @type {Array}
     */
    histories: null,

    /**
     * Gets the list of history
     */
    getHistories: task(function* () {
        const enums = this.get('enums');
        const data = yield this.get('store').query('history', {});
        const exercises = this.get('exerciseRepository.exercises');
        const workouts = this.get('workoutRepository.workouts');

        const transformedData = (data || []).map(history => {
            return {
                id: get(history, 'id'),
                durationInSeconds: get(history, 'durationInSeconds'),
                loggedDate: get(history, 'loggedDate'),
                workoutId: get(history, 'workoutId'),
                configuration: get(history, 'configuration')
            }
        });

        transformedData.forEach(history => {
            const workoutDetails = workouts.find(item => get(item, 'id') === get(history, 'workoutId'));
            if (isPresent(workoutDetails)) {
                setProperties(history, {
                    creatorId: get(workoutDetails, 'creatorId'),
                    name: get(workoutDetails, 'name'),
                    workoutTypeKey: enums.getKeyByValue(enums.workoutTypes, workoutDetails.type),
                    workoutConfiguration: get(workoutDetails, 'configuration')
                });
            }

            get(history, 'configuration.exercises').forEach(exercise => {
                const exerciseDetails = exercises.find(item => get(item, 'id') === get(exercise, 'id'));

                if (isPresent(exerciseDetails)) {
                    setProperties(exercise, {
                        creatorId: get(exerciseDetails, 'creatorId'),
                        name: get(exerciseDetails, 'name'),
                        weight: get(exerciseDetails, 'weight'),
                        equipmentKey: enums.getKeyByValue(enums.exerciseEquipment, exerciseDetails.weight),
                        doneSets: get(exercise, 'sets').filter(item => item.done).length
                    });
                }
            });
        });

        this.set('histories', transformedData);
        return transformedData;
    }),

    /**
     * Delete a history log
     */
    deleteLog: task(function* (logId) {
        const histories = this.get('histories');
        const log = this.get('store').peekRecord('history', logId);
        const index = histories.findIndex(item => item.id === logId);

        yield log.destroyRecord();

        this.set('histories', histories.slice(0, index).concat(histories.slice(index + 1, histories.length)));
    }),

    refreshList: task(function* () {
        yield this.get('getHistories').perform();
    })
});
