import DS from 'ember-data';

const { attr, Model } = DS;

export default Model.extend({
    email: attr('string'),
    fname: attr('string'),
    lname: attr('string'),
    username: attr('string')
});
