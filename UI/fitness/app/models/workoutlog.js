import DS from 'ember-data';

const { attr, Model } = DS;

export default Model.extend({
    durationInSeconds: attr('number'),
    configuration: attr(),
    loggedDate: attr('date'),
    workoutId: attr('string')
});
