import DS from 'ember-data';

const { attr, Model } = DS;

export default Model.extend({
    confirmedPassword: attr('string'),
    email: attr('string'),
    fname: attr('string'),
    lname: attr('string'),
    password: attr('string'),
    unit: attr('string'),
    username: attr('string'),
    weight: attr('number')
});
