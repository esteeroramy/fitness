import DS from 'ember-data';

const { attr, Model } = DS;

export default Model.extend({
    email: attr('string'),
    fname: attr('string'),
    hasWorkoutsInProgress: attr('Boolean'),
    lname: attr('string'),
    username: attr('string')
});
