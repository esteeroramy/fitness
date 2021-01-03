import DS from 'ember-data';

const { attr, Model } = DS;

export default Model.extend({
    creatorId: attr('string'),
    name: attr('string'),
    weight: attr('string')
});
