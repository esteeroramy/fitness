const common = require('../common.js');
const db = require('./db.js');

/**
 * Created a workout in the database
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

// <exports> -----------------------------------
exports.createWorkout = createWorkout;
// </exports> -----------------------------------
