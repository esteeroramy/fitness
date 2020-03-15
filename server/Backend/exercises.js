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
        };

        return callback(null, exerciseToRerturn);
    });
}

/**
 * Calls the db method and returns the minified list of exercises
 * created by the current user
 * 
 * @param {String} userId 
 * @param {Function} callback 
 */
const queryCustomExercises = function(userId, callback) {
    db.getExercisesByCreatorId(userId, (err, exercises) => {
        if (err) {
            return callback(err, null);
        }

        const exerciseToRerturn = exercises.map(exercise => {
            return {
                id: exercise._id,
                name: exercise.name,
                weight: exercise.weight,
            };
        });

        return callback(null, exerciseToRerturn);   
    });
};

/**
 * Calls the db method and returns the minified list of predefined exercises
 * 
 * @param {Function} callback 
 */
const queryPredefinedExercises = function(callback) {
    db.getPredefinedExercises((err, exercises) => {
        if (err) {
            return callback(err, null);
        }

        const exerciseToRerturn = exercises.map(exercise => {
            return {
                id: exercise._id,
                name: exercise.name,
                weight: exercise.weight,
            };
        });

        return callback(null, exerciseToRerturn);   
    });
};

// <exports> -----------------------------------
exports.createExercise = createExercise;
exports.queryCustomExercises = queryCustomExercises;
exports.queryPredefinedExercises = queryPredefinedExercises;
// </exports> -----------------------------------
