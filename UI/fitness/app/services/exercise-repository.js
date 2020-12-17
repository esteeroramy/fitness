import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { task } from 'ember-concurrency';

export default Service.extend({
    enums: service(),
    store: service(),

    /**
     * The list of exercises available
     *
     * @type {Array}
     */
    exercises: null,

    /**
     * Creates an exercise
     */
    createExercise: task(function* (exercise) {
        const enums = this.get('enums');
        const data = yield this.get('store').createRecord('exercise', exercise);
        const savedData = yield data.save();

        const transformedData = {
            id: get(savedData, 'id'),
            creatorId: get(savedData, 'creatorId'),
            name: get(savedData, 'name'),
            weight: get(savedData, 'weight'),
            equipmentKey: enums.getKeyByValue(enums.exerciseEquipment, savedData.weight)
        }

        this.set('exercises', this.get('exercises').concat(transformedData));

        return transformedData;
    }),

    /**
     * Gets the list of exercises
     */
    getExercises: task(function* () {
        const enums = this.get('enums');
        const data = yield this.get('store').query('exercise', {});

        const transformedData = (data || []).map(exercise => {
            return {
                id: get(exercise, 'id'),
                creatorId: get(exercise, 'creatorId'),
                name: get(exercise, 'name'),
                weight: get(exercise, 'weight'),
                equipmentKey: enums.getKeyByValue(enums.exerciseEquipment, exercise.weight)
            }
        });

        this.set('exercises', transformedData);
        return transformedData;
    })
});
