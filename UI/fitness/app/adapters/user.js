import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
    urlForCreateRecord() {
        return `${this._super(...arguments)}/create`;
    }
});
