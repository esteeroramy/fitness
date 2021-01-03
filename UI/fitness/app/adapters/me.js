import ApplicationAdapter from './application';
import { camelize } from '@ember/string';
import { singularize } from 'ember-inflector';

export default ApplicationAdapter.extend({
    pathForType: function(type) {
        let camelized = camelize(type);
        return singularize(camelized);
    }
});
