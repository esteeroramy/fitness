const common = require('../common.js');
const db = require('./db.js');

/**
 * Create a workout in the database
 *
 * @param {String} userId
 * @param {Object} workoutObject
 * @param {Function} callback
 */
const createWorkout = function(userId, workoutObject, callback) {
    workoutObject._id = common.getUUID();

    db.createWorkout(userId, workoutObject, (err, workoutObject) => {
        if (err) {
            return callback(err, null);
        }

        return callback(null, workoutObject);
    });
}

/**
 * Edit a workout in the database
 *
 * @param {String} workoutId
 * @param {Object} workoutObject
 * @param {Function} callback
 */
const editWorkout = function(workoutId, workoutObject, callback) {
    db.editWorkout(workoutId, workoutObject, (err, workoutObject) => {
        if (err) {
            return callback(err, null);
        }

        return callback(null, workoutObject);
    });
}

/**
 * Calls the db method and returns the list of workouts
 *
 * @param {String} userId
 * @param {Function} callback
 */
const getWorkouts = function(userId, callback) {
    db.getWorkouts(userId, (err, workouts) => {
        if (err) {
            return callback(err, null);
        }

        const workoutsToReturn = workouts.map(workout => {
            return {
                id: workout._id,
                isDeleted: workout.isDeleted,
                name: workout.name,
                type: workout.type,
                creatorId: workout.creatorId,
                configuration: workout.configuration
            };
        });

        return callback(null, workoutsToReturn);
    });
};

/**
 * Calls the db method and logs a workout
 *
 * @param {String} userId
 * @param {Object} workoutLog
 * @param {Function} callback
 */
const logWorkout = function(userId, workoutLog, callback) {
    workoutLog._id = common.getUUID();

    db.logWorkout(userId, workoutLog, (err, log) => {
        if (err) {
            return callback(err, null);
        }

        const workoutLogToReturn = {
            id: log._id,
            workoutId: log.workoutId,
            creatorId: log.creatorId,
            configuration: log.configuration,
            durationInSeconds: log.durationInSeconds,
            loggedDate: log.loggedDate
        }

        return callback(null, workoutLogToReturn);
    });
};

/**
 * Calls the db method to get the latest log for a workout
 *
 * @param {String} workoutId
 * @param {Function} callback
 */
const getLatestWorkoutslog = function(workoutId, callback) {
    db.getLatestWorkoutslog(workoutId, (err, log) => {
        if (err) {
            return callback(err, null);
        }

        if (log.id === -1) {
            return callback(null, log);
        }

        const workoutLogToReturn = {
            id: log._id,
            workoutId: log.workoutId,
            creatorId: log.creatorId,
            configuration: log.configuration,
            durationInSeconds: log.durationInSeconds,
            loggedDate: log.loggedDate
        }

        return callback(null, workoutLogToReturn);
    });
};

/**
 * Calls the db method to get the user history
 *
 * @param {String} userId
 * @param {Function} callback
 */
const getHistories = function(userId, callback) {
    db.getHistories(userId, (err, histories) => {
        if (err) {
            return callback(err, null);
        }

        const historiesToReturn = histories.map(history => {
            return {
                id: history._id,
                workoutId: history.workoutId,
                creatorId: history.creatorId,
                configuration: history.configuration,
                durationInSeconds: history.durationInSeconds,
                loggedDate: history.loggedDate
            };
        });

        return callback(null, historiesToReturn);
    });
};

/**
 * Calls the db method to delete the history
 *
 * @param {String} logId
 * @param {Function} callback
 */
const deleteHistories = function(logId, callback) {
    db.deleteHistories(logId, (err, _) => {
        if (err) {
            return callback(err, null);
        }

        return callback(null, {});
    });
};

/**
 * Calls the db method to delete the workout
 *
 * @param {String} workoutId
 * @param {Function} callback
 */
const deleteWorkout = function(workoutId, callback) {
    db.deleteWorkout(workoutId, (err, _) => {
        if (err) {
            return callback(err, null);
        }

        return callback(null, {});
    });
};

// <exports> -----------------------------------
exports.createWorkout = createWorkout;
exports.editWorkout = editWorkout;
exports.getWorkouts = getWorkouts;
exports.logWorkout = logWorkout;
exports.getLatestWorkoutslog = getLatestWorkoutslog;
exports.getHistories = getHistories;
exports.deleteHistories = deleteHistories;
exports.deleteWorkout = deleteWorkout;
// </exports> -----------------------------------
