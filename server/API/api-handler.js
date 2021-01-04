const users_api = require('./api-components/users-api.js');
const exercises_api = require('./api-components/exercises-api.js');
const workouts_api = require('./api-components/workouts-api.js');

// <Exercises Requests> ------------------------------------------------
exports.handleExercisesCreatePath = exercises_api.createExercise;
exports.handleExercisesGetPath = exercises_api.getExercises;
// </Exercises Requests> ------------------------------------------------

// <Users Requests> ------------------------------------------------
exports.handleLoginPath = users_api.login;
exports.handleGetMePath = users_api.me;
exports.handleUsersCreatePath = users_api.createUser;
exports.handleUsersGetProfilePath = users_api.getProfile;
exports.handleUsersUpdatePassword = users_api.updatePassword;
exports.handleUsersUpdateProfile = users_api.updateProfile;
// </Users Requests> ------------------------------------------------

// <Workouts Requests> ------------------------------------------------
exports.handleHistoriesGetPath = workouts_api.getHistories;
exports.handleHistoriesDeletePath = workouts_api.deleteHistories;
exports.handleWorkoutsCreatePath = workouts_api.createWorkout;
exports.handleWorkoutsEditPath = workouts_api.editWorkout;
exports.handleWorkoutsGetPath = workouts_api.getWorkouts;
exports.handleWorkoutsLogPath = workouts_api.logWorkout;
exports.handleLatestWorkoutslogsGetPath = workouts_api.getLatestWorkoutslog;
exports.handleWorkoutsDeletePath = workouts_api.deleteWorkout;
// </Workouts Requests> ------------------------------------------------
