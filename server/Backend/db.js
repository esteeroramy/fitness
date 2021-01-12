const mongoose = require('mongoose');

const common = require('../common.js');
const config = require('./config.js');
const db_exercises = require('./dbs/db-exercises.js');
const db_users = require('./dbs/db-users.js');
const db_workouts = require('./dbs/db-workouts.js');
const db_workoutlogs = require('./dbs/db-workoutlogs.js');
const db_progress_photos = require('./dbs/db-progress-photos.js');
const db_workout_in_progress = require('./dbs/db-workout-in-progress');

const exercise = require('./dbs/models/exercise');

/**
 * Initializes the connection to the database
 *
 * @param {Function} callback
 * @returns {Function} callback
 */
const initialize = function(callback) {
    mongoose.connect(`mongodb://${config.hostName}/${config.dbName}`, function(err, client) {
        if (err) {
            return callback(common.getError(1001), null);
        }

        return callback(null, 'ok');
    });

    upgradeA();
};

const exercisesToAdd = [
    {
        name: 'Barbell Bench Press',
        weight: common.weights.BARBELL
    },
    {
        name: 'Incline Bench Press',
        weight: common.weights.BARBELL
    },
    {
        name: 'Decline Bench Press',
        weight: common.weights.BARBELL
    },
    {
        name: 'Flat Dumbbell Press',
        weight: common.weights.DUMBBELL
    },
    {
        name: 'Incline Dumbbell Press',
        weight: common.weights.DUMBBELL
    },
    {
        name: 'Decline Dumbbell Press',
        weight: common.weights.DUMBBELL
    },
    {
        name: 'Chest Supported Row',
        weight: common.weights.BARBELL
    },
    {
        name: 'Barbell Rows',
        weight: common.weights.BARBELL
    },
    {
        name: 'Standing Overhead Press',
        weight: common.weights.BARBELL
    },
    {
        name: 'Lat Pulldown',
        weight: common.weights.CABLE
    },
    {
        name: 'High to Low Cable Flies',
        weight: common.weights.CABLE
    },
    {
        name: 'Face Pulls',
        weight: common.weights.CABLE
    },
    {
        name: 'Kneeling Face Pulls',
        weight: common.weights.CABLE
    },
    {
        name: 'Lying Face Pulls',
        weight: common.weights.CABLE
    },
    {
        name: 'Back Squat',
        weight: common.weights.BARBELL
    },
    {
        name: 'Front Squat',
        weight: common.weights.BARBELL
    },
    {
        name: 'Deadlift',
        weight: common.weights.BARBELL
    },
    {
        name: 'Barbell Hip Thrusts',
        weight: common.weights.BARBELL
    },
    {
        name: 'Calf Raises',
        weight: common.weights.BARBELL
    },
    {
        name: 'Cable Lateral Raises',
        weight: common.weights.CABLE
    },
    {
        name: 'Dumbbell Lateral Raises',
        weight: common.weights.DUMBBELL
    },
    {
        name: 'Pushups',
        weight: common.weights.BODYWEIGHT
    },
    {
        name: 'Banded Pushups',
        weight: common.weights.RESISTANCEBAND
    },
    {
        name: 'Overhead Rope Extensions',
        weight: common.weights.CABLE
    },
    {
        name: 'Bar Tricep Pushdowns',
        weight: common.weights.CABLE
    },
    {
        name: 'Pullups',
        weight: common.weights.BODYWEIGHT
    },
    {
        name: 'Seated Row',
        weight: common.weights.CABLE
    },
    {
        name: 'Reverse Pec Deck',
        weight: common.weights.MACHINE
    },
    {
        name: 'Incline Dumbbell Curls',
        weight: common.weights.DUMBBELL
    },
    {
        name: 'Hammer Curls',
        weight: common.weights.DUMBBELL
    },
    {
        name: 'Scapular Pullups',
        weight: common.weights.BODYWEIGHT
    },
    {
        name: 'Bulgarian Split Squat',
        weight: common.weights.DUMBBELL
    },
    {
        name: 'Glute Ham Raise',
        weight: common.weights.BODYWEIGHT
    },
    {
        name: 'Standing Calf Raises',
        weight: common.weights.BARBELL
    },
    {
        name: 'Back Squat',
        weight: common.weights.BARBELL
    }
];

const upgradeA = function() {
    exercise.find({ creatorId : 'system' }, function(err, exercises) {
        if (exercises.length === 0) {
            exercisesToAdd.forEach(item => {
                db_exercises.createExercise(
                'system',
                {
                    _id: common.getUUID(),
                    name: item.name,
                    weight: item.weight,
                },
                () => {});
            });
        }
    });
};

exports.initialize = initialize;

// <Exercises Collection> -------------------------------------------------
exports.createExercise = db_exercises.createExercise;
exports.getExercises = db_exercises.getExercises;
// </Exercises Collection> -------------------------------------------------

// <Users Collection> -------------------------------------------------
exports.createUser = db_users.createUser;
exports.getUserById = db_users.getUserById;
exports.getUserByUsername = db_users.getUserByUsername;
exports.updateById = db_users.updateById;
// </Users Collection> -------------------------------------------------

// <Workouts Collection> -------------------------------------------------
exports.createWorkout = db_workouts.createWorkout;
exports.editWorkout = db_workouts.editWorkout;
exports.getWorkouts = db_workouts.getWorkouts;
exports.deleteWorkout = db_workouts.deleteWorkout;
// </Workouts Collection> -------------------------------------------------

// <Workoutlog Collection> -------------------------------------------------
exports.logWorkout = db_workoutlogs.logWorkout;
exports.getLatestWorkoutslog = db_workoutlogs.getLatestWorkoutslog;
exports.getHistories = db_workoutlogs.getHistories;
exports.deleteHistories = db_workoutlogs.deleteHistories;
// </Workoutlog Collection> -------------------------------------------------

// <Workoutlog Collection> -------------------------------------------------
exports.createProgressPhoto = db_progress_photos.createProgressPhoto;
exports.getProgressPhotos = db_progress_photos.getProgressPhotos;
// </Workoutlog Collection> -------------------------------------------------

// <WorkoutInProgress Collection> -------------------------------------------------
exports.createWorkoutInProgress = db_workout_in_progress.createWorkoutInProgress;
exports.editWorkoutInProgress = db_workout_in_progress.editWorkoutInProgress;
exports.deleteWorkoutInProgress = db_workout_in_progress.deleteWorkoutInProgress;
exports.getWorkoutInProgressByUserId = db_workout_in_progress.getWorkoutInProgressByUserId;
exports.getWorkoutInProgressById = db_workout_in_progress.getWorkoutInProgressById;
exports.getAllWorkoutsInProgress = db_workout_in_progress.getAllWorkoutsInProgress;
// </WorkoutInProgress Collection> -------------------------------------------------
