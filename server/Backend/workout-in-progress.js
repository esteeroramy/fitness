const common = require('../common.js');
const db = require('./db.js');

/**
 * Create a workout in progress in the database
 *
 * @param {Object} workoutInProgress
 * @param {Function} callback
 */
const createWorkoutInProgress = function(workoutInProgress, callback) {
    workoutInProgress._id = common.getUUID();

    db.createWorkoutInProgress(workoutInProgress, (err, workoutInProgressObject) => {
        if (err) {
            return callback(err, null);
        }

        const workoutInProgressObjectToReturn = {
            id: workoutInProgressObject._id,
            creatorId: workoutInProgressObject.creatorId,
            workoutId: workoutInProgressObject.workoutId,
            workoutStartTime: workoutInProgressObject.workoutStartTime,
            exerciseProgress: workoutInProgressObject.exerciseProgress
        };

        return callback(null, workoutInProgressObjectToReturn);
    });
};

/**
 * Edit a workout in progress in the database
 *
 * @param {String} workoutInProgressId
 * @param {Object} workoutInProgress
 * @param {Function} callback
 */
const editWorkoutInProgress = function(workoutInProgressId, workoutInProgress, callback) {
    db.editWorkoutInProgress(workoutInProgressId, workoutInProgress, (err, workoutInProgressObject) => {
        if (err) {
            return callback(err, null);
        }

        const workoutInProgressObjectToReturn = {
            id: workoutInProgressObject._id,
            creatorId: workoutInProgressObject.creatorId,
            workoutId: workoutInProgressObject.workoutId,
            workoutStartTime: workoutInProgressObject.workoutStartTime,
            exerciseProgress: workoutInProgressObject.exerciseProgress
        };

        return callback(null, workoutInProgressObjectToReturn);
    });
};

/**
 * Calls the db method to delete the workout in progress
 *
 * @param {String} workoutInProgressId
 * @param {Function} callback
 */
const deleteWorkoutInProgress = function(workoutInProgressId, callback) {
    db.deleteWorkoutInProgress(workoutInProgressId, (err, _) => {
        if (err) {
            return callback(err, null);
        }

        return callback(null, {});
    });
};

/**
 * Gets the workout in progress from the database
 *
 * @param {String} workoutInProgressId
 * @param {Function} callback
 */
const getWorkoutInProgress = function(workoutInProgressId, callback) {
    db.getWorkoutInProgressById(workoutInProgressId, (err, workoutInProgressObject) => {
        if (err) {
            return callback(err, null);
        }

        const workoutsInProgressToReturn = {
            id: workoutInProgressObject._id,
            creatorId: workoutInProgressObject.creatorId,
            workoutId: workoutInProgressObject.workoutId,
            workoutStartTime: workoutInProgressObject.workoutStartTime,
            exerciseProgress: workoutInProgressObject.exerciseProgress
        };

        return callback(null, workoutsInProgressToReturn);
    });
};

/**
 * Gets the workouts in progress from the database
 *
 * @param {String} userId
 * @param {Function} callback
 */
const getAllWorkoutsInProgress = function(userId, callback) {
    db.getAllWorkoutsInProgress(userId, (err, workoutInProgressObject) => {
        if (err) {
            return callback(err, null);
        }

        const workoutsInProgressToReturn = (workoutInProgressObject || []).map(item => {
            return {
                id: item._id,
                creatorId: item.creatorId,
                workoutId: item.workoutId,
                workoutStartTime: item.workoutStartTime,
                exerciseProgress: item.exerciseProgress
            }
        });

        return callback(null, workoutsInProgressToReturn);
    });
};

// <exports> -----------------------------------
exports.createWorkoutInProgress = createWorkoutInProgress;
exports.editWorkoutInProgress = editWorkoutInProgress;
exports.deleteWorkoutInProgress = deleteWorkoutInProgress;
exports.getWorkoutInProgress = getWorkoutInProgress;
exports.getAllWorkoutsInProgress = getAllWorkoutsInProgress;
// </exports> -----------------------------------
