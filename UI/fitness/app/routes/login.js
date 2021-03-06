import Route from '@ember/routing/route';
import unauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(unauthenticatedRouteMixin, {
    routeIfAlreadyAuthenticated: 'home',

    resetController(controller, isExiting) {
        if (isExiting) {
            controller.resetFields();
            controller.resetValidation();
        }
    }
});
