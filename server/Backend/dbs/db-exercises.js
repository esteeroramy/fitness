const common = require('../../common.js');
const exercise = require('./models/exercise');

/**
 *
 * @param {String} userId
 * @param {Object} exerciseObject
 * @param {Function} callback
 * @returns {Function}
 */
const createExercise = function(userId, exerciseObject, callback) {
    let newExercise = new exercise();

    newExercise._id = exerciseObject._id;
    newExercise.creatorId = userId;
    newExercise.name = exerciseObject.name;
    newExercise.weight = exerciseObject.weight;

    newExercise.save(function(err) {
        if (err) {
            return callback(common.getError(3000), null);
        }

        return callback(null, newExercise);
    });
};

/**
 * Finds all exercises for the user
 *
 * @param {String} creatorId
 * @param {Function} callback
 */
const getExercises = function(creatorId, callback) {
    exercise.find({ $or:[ { creatorId }, { creatorId : 'system' } ] }, function(err, exercises) {
        if (err) {
            return callback(common.getError(4002), null);
        }

        return callback(null, exercises);
    });
}

// <exports> -----------------------------------
exports.createExercise = createExercise;
exports.getExercises = getExercises;
// </exports> -----------------------------------
