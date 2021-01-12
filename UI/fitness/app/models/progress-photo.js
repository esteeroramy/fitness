import DS from 'ember-data';

const { attr, Model } = DS;

export default Model.extend({
    date: attr('date'),
    image: attr(),
    minImage: attr(),
    notes: attr('string'),
    creatorId: attr('string')
});
