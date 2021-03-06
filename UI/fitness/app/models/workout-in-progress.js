import DS from 'ember-data';

const { attr, Model } = DS;

export default Model.extend({
    exerciseProgress: attr(),
    workoutId: attr('string'),
    workoutStartTime: attr('date')
});
