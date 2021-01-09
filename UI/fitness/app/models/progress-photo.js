import DS from 'ember-data';

const { attr, Model } = DS;

export default Model.extend({
    date: attr('date'),
    image: attr(),
    notes: attr('string'),
    creatorId: attr('string')
});
