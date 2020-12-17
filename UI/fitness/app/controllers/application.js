import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    application: service(),
    session: service(),

    init() {
        if (this.get('session.isAuthenticated')) {
            this.get('application.startUpTask').perform();
        }

        this._super(...arguments);
    }
});
