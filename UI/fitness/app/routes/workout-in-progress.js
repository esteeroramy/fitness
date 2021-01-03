import Route from '@ember/routing/route';

export default Route.extend({
    deactivate() {
        this.controller.reset();

        this._super(...arguments);
    }
});
