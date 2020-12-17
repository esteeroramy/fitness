const common = require('../../common.js');
const workout = require('./models/workout');

/**
 * Creates a new workout
 *
 * @param {String} userId
 * @param {Object} workoutObject
 * @param {Function} callback
 * @returns {Function}
 */
const createWorkout = function(userId, workoutObject, callback) {
    let newWorkout = new workout();

    newWorkout._id = workoutObject._id;
    newWorkout.creatorId = userId;
    newWorkout.name = workoutObject.name;
    newWorkout.type = workoutObject.type;
    newWorkout.configuration = workoutObject.configuration;

    newWorkout.save(function(err) {
        if (err) {
            return callback(common.getError(4000), null);
        }

        return callback(null, newWorkout);
    });
};

/**
 * Edits a workout
 *
 * @param {String} workoutId
 * @param {Object} workoutObject
 * @param {Function} callback
 * @returns {Function}
 */
const editWorkout = function(workoutId, workoutObject, callback) {
    workout.findOne({ _id: workoutId }, function(err, foundWorkout) {
        if (err) {
            return callback(common.getError(4002), null);
        }

        foundWorkout.name = workoutObject.name
        foundWorkout.configuration = workoutObject.configuration

        foundWorkout.save(function(err) {
            if (err) {
                return callback(common.getError(4004), null);
            }

            return callback(null, foundWorkout);
        });
    });
};

/**
 * Finds all workouts for the user
 *
 * @param {String} creatorId
 * @param {Function} callback
 */
const getWorkouts = function(creatorId, callback) {
    workout.find({ creatorId }, function(err, workouts) {
        if (err) {
            return callback(common.getError(4002), null);
        }

        return callback(null, workouts);
    });
};

// <exports> -----------------------------------
exports.createWorkout = createWorkout;
exports.editWorkout = editWorkout;
exports.getWorkouts = getWorkouts;
// </exports> -----------------------------------
