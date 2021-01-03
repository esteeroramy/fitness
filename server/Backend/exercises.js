const common = require('../common.js');
const db = require('./db.js');

/**
 * Created an exercise in the database
 * 
 * @param {String} userId 
 * @param {Object} exerciseObject 
 * @param {Function} callback 
 */
const createExercise = function(userId, exerciseObject, callback) {
    exerciseObject._id = common.getUUID();

    db.createExercise(userId, exerciseObject, (err, exerciseObject) => {
        if (err) {
            return callback(err, null);
        }

        const exerciseToRerturn = {
            id: exerciseObject._id,
            name: exerciseObject.name,
            weight: exerciseObject.weight,
            creatorId: exerciseObject.creatorId,
        };

        return callback(null, exerciseToRerturn);
    });
}

/**
 * Calls the db method and returns the list of exercises
 *
 * @param {String} userId
 * @param {Function} callback
 */
const getExercises = function(userId, callback) {
    db.getExercises(userId, (err, exercises) => {
        if (err) {
            return callback(err, null);
        }

        const exerciseToRerturn = exercises.map(exercise => {
            return {
                id: exercise._id,
                name: exercise.name,
                weight: exercise.weight,
                creatorId: exercise.creatorId
            };
        });

        return callback(null, exerciseToRerturn);
    });
};

// <exports> -----------------------------------
exports.createExercise = createExercise;
exports.getExercises = getExercises;
// </exports> -----------------------------------
