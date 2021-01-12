const progress_photos_api = require('./api-components/progress-photos-api.js');
const exercises_api = require('./api-components/exercises-api.js');
const users_api = require('./api-components/users-api.js');
const workout_in_progress_api = require('./api-components/workout-in-progress-api.js')
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

// <Progress Photos Requests> ------------------------------------------------
exports.handleCreateProgressPhotosPath = progress_photos_api.createProgressPhoto;
exports.handleGetProgressPhotosPath = progress_photos_api.getProgressPhotos;
// </Progress Photos Requests> ------------------------------------------------

// <Workout In Progress Requests> ------------------------------------------------
exports.handleWorkoutInProgressCreatePath = workout_in_progress_api.createWorkoutInProgress;
exports.handleWorkoutInProgressEditPath = workout_in_progress_api.editWorkoutInProgress;
exports.handleWorkoutInProgressDeletePath = workout_in_progress_api.deleteWorkoutInProgress;
exports.handleWorkoutInProgressGetPath = workout_in_progress_api.getWorkoutInProgress;
exports.handleWorkoutInProgressGetAllPath = workout_in_progress_api.getAllWorkoutsInProgress;
// </Workout In Progress Requests> ------------------------------------------------
