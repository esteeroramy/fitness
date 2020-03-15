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

// <exports> -----------------------------------
exports.createWorkout = createWorkout;
// </exports> -----------------------------------
