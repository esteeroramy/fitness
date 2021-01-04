import DS from 'ember-data';

const { attr, Model } = DS;

export default Model.extend({
    isDeleted: attr('boolean'),
    name: attr('string'),
    type: attr('string'),
    configuration: attr()
});
