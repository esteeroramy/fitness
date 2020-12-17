import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('home', { path: '/' });
  this.route('register');
  this.route('profile');
  this.route('history');
  this.route('exercises');
  this.route('measurements');
  this.route('create-workout');
  this.route('workout-in-progress');
});

export default Router;
