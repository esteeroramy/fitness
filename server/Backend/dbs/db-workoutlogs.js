const common = require('../../common.js');
const workoutlog = require('./models/workoutlog');

/**
 * Logs a new workout
 *
 * @param {String} userId
 * @param {Object} workoutlogObject
 * @param {Function} callback
 * @returns {Function}
 */
const logWorkout = function(userId, workoutlogObject, callback) {
    let newWorkoutlog = new workoutlog();

    newWorkoutlog._id = workoutlogObject._id;
    newWorkoutlog.workoutId = workoutlogObject.workoutId;
    newWorkoutlog.creatorId = userId;
    newWorkoutlog.configuration = workoutlogObject.configuration;
    newWorkoutlog.durationInSeconds = workoutlogObject.durationInSeconds;
    newWorkoutlog.loggedDate = workoutlogObject.loggedDate;

    newWorkoutlog.save(function(err) {
        if (err) {
            return callback(common.getError(5000), null);
        }

        return callback(null, newWorkoutlog);
    });
};

/**
 * Gets the latest log for a workout
 *
 * @param {String} workoutId
 * @param {Function} callback
 * @returns {Function}
 */
const getLatestWorkoutslog = function(workoutId, callback) {
    workoutlog.find({ workoutId }, function(err, logs) {
        if (err) {
            return callback(common.getError(5001), null);
        }

        if (logs.length === 0) {
            return callback(null, { id: -1 });
        }

        let latestObject = logs[0];
        logs.forEach(log => {
            if (log.loggedDate > latestObject.loggedDate) {
                latestObject = log;
            }
        })

        return callback(null, latestObject);
    });
};

/**
 * Finds all workouts for the user
 *
 * @param {String} userId
 * @param {Function} callback
 */
const getHistories = function(userId, callback) {
    workoutlog.find({
        creatorId: userId
    },
    ['_id','configuration', 'creatorId', 'workoutId', 'durationInSeconds', 'loggedDate'],
    {
        sort: {
            loggedDate: -1
        }
    },
    function(err, histories) {
        if (err) {
            return callback(common.getError(5001), null);
        }

        return callback(null, histories);
    });
};

/**
 * Delete the log
 *
 * @param {String} logId
 * @param {Function} callback
 */
const deleteHistories = function(logId, callback) {
    workoutlog.deleteOne({ _id: logId }, function(err, _) {
        if (err) {
            return callback(common.getError(5002), null);
        }

        return callback(null, {});
    });
};

// <exports> -----------------------------------
exports.logWorkout = logWorkout;
exports.getLatestWorkoutslog = getLatestWorkoutslog;
exports.getHistories = getHistories;
exports.deleteHistories = deleteHistories;
// </exports> -----------------------------------
