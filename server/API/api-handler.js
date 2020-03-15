const users_api = require('./api-components/users-api.js');
const exercises_api = require('./api-components/exercises-api.js');
const workouts_api = require('./api-components/workouts-api.js');

// <Exercises Requests> ------------------------------------------------
exports.handleExercisesCreatePath = exercises_api.createExercise;
exports.handleExercisesCustomQueryPath = exercises_api.queryCustomExercises;
exports.handleExercisesPredefinedQueryPath = exercises_api.queryPredefinedExercises;
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
exports.handleWorkoutsCreatePath = workouts_api.createWorkout;
// </Workouts Requests> ------------------------------------------------
