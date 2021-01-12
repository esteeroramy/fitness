const common = require('../../common.js');
const workoutInProgress = require('./models/workout-in-progress');

/**
 * Creates a progress photo
 *
 * @param {Object} workoutInProgressObject
 * @param {Function} callback
 * @returns {Function}
 */
const createWorkoutInProgress = function(workoutInProgressObject, callback) {
    let newWorkoutInProgress = new workoutInProgress();

    newWorkoutInProgress._id = workoutInProgressObject._id;
    newWorkoutInProgress.creatorId = workoutInProgressObject.creatorId;
    newWorkoutInProgress.workoutId = workoutInProgressObject.workoutId;
    newWorkoutInProgress.workoutStartTime = workoutInProgressObject.workoutStartTime;
    newWorkoutInProgress.exerciseProgress = workoutInProgressObject.exerciseProgress;

    newWorkoutInProgress.save(function(err) {
        if (err) {
            return callback(common.getError(7000), null);
        }

        return callback(null, workoutInProgressObject);
    });
};

/**
 * Edits a workout in progress
 *
 * @param {String} workoutInProgressId
 * @param {Object} workoutInProgress
 * @param {Function} callback
 * @returns {Function}
 */
const editWorkoutInProgress = function(workoutInProgressId, workoutInProgressObject, callback) {
    workoutInProgress.findOne({ _id: workoutInProgressId }, function(err, foundWorkoutInProgres) {
        if (err) {
            return callback(common.getError(7001), null);
        }

        foundWorkoutInProgres.exerciseProgress = workoutInProgressObject.exerciseProgress;

        foundWorkoutInProgres.save(function(err) {
            if (err) {
                return callback(common.getError(7002), null);
            }

            return callback(null, foundWorkoutInProgres);
        });
    });
};

/**
 * Delete the workout in progress
 *
 * @param {String} workoutInProgressId
 * @param {Function} callback
 */
const deleteWorkoutInProgress = function(workoutInProgressId, callback) {
    workoutInProgress.deleteOne({ _id: workoutInProgressId }, function(err) {
        if (err) {
            return callback(common.getError(7003), null);
        }

        return callback(null, {});
    });
};

/**
 * Get a workout in progress by the user id
 *
 * @param {String} userId
 * @param {Function} callback
 */
const getWorkoutInProgressByUserId = function(userId, callback) {
    workoutInProgress.find({ creatorId: userId }, function(err, workoutInProgressObject) {
        if (err) {
            return callback(common.getError(7004), null);
        }

        return callback(null, workoutInProgressObject);
    });
};

/**
 * Get a workout in progress by id
 *
 * @param {String} workoutInProgressId
 * @param {Function} callback
 */
const getWorkoutInProgressById = function(workoutInProgressId, callback) {
    workoutInProgress.findOne({ _id: workoutInProgressId }, function(err, workoutInProgressObject) {
        if (err) {
            return callback(common.getError(7005), null);
        }

        return callback(null, workoutInProgressObject);
    });
};

/**
 * Get workouts in progress by userId
 *
 * @param {String} userId
 * @param {Function} callback
 */
const getAllWorkoutsInProgress = function(userId, callback) {
    workoutInProgress.find({ creatorId: userId }, function(err, workoutsInProgressObject) {
        if (err) {
            return callback(common.getError(7006), null);
        }

        return callback(null, workoutsInProgressObject);
    });
};

// <exports> -----------------------------------
exports.createWorkoutInProgress = createWorkoutInProgress;
exports.editWorkoutInProgress = editWorkoutInProgress;
exports.deleteWorkoutInProgress = deleteWorkoutInProgress;
exports.getWorkoutInProgressByUserId = getWorkoutInProgressByUserId;
exports.getWorkoutInProgressById = getWorkoutInProgressById;
exports.getAllWorkoutsInProgress = getAllWorkoutsInProgress;
// </exports> -----------------------------------
