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
 * Finds all exercises created by the creatorId
 * 
 * @param {String} creatorId 
 * @param {Function} callback 
 */
const getExercisesByCreatorId = function(creatorId, callback) {
    exercise.find({ creatorId }, function(err, exercises) {
        if (err) {
            return callback(common.getError(3003), null);
        }

        return callback(null, exercises);
    });
}

/**
 * Finds all predefined exercises
 * 
 * @param {Function} callback 
 */
const getPredefinedExercises = function(callback) {
    exercise.find({ creatorId: 'system' }, function(err, exercises) {
        if (err) {
            return callback(common.getError(3003), null);
        }

        return callback(null, exercises);
    });
}

// <exports> -----------------------------------
exports.createExercise = createExercise;
exports.getExercisesByCreatorId = getExercisesByCreatorId;
exports.getPredefinedExercises = getPredefinedExercises;
// </exports> -----------------------------------
