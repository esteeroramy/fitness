const xss = require('xss');

const common = require('../../common.js');
const exercises = require('../../Backend/exercises.js');

/**
 * Create a new exercise
 *
 * @param {Object} req
 * @param {Object} res
 */
const createExercise = (req, res) => {
    common.verifyToken (req, res, (req, res) => {
        const userId = req.authData.signObject._id;
        const name = xss(req.body.name);
        const weight = xss(req.body.weight);

        const availableWeights = Object.values(common.weights);

        if (typeof(name) !== common.variableTypes.STRING ||
            typeof(weight) !== common.variableTypes.STRING ||
            common.isEmptyString(name) ||
            common.isEmptyString(weight) ||
            !(availableWeights.includes(weight))) {
                return res.status(common.getStatus(3002)).send(common.getError(3002));
        }

        const newExercise = {
            name,
            weight
        };

        exercises.createExercise(userId, newExercise, (err, exerciseObject) => {
            if (err) {
                return res.status(common.getStatus(err)).send(err);
            }

            return res.status(200).send(exerciseObject);
        });
    });
};

/**
 * returns the list of exercises
 *
 * @param {Object} req
 * @param {Object} res
 */
const getExercises = (req, res) => {
    common.verifyToken (req, res, (req, res) => {
        const userId = req.authData.signObject._id;

        exercises.getExercises(userId, (err, exercises) => {
            if (err) {
                return res.status(common.getStatus(err)).send(err);
            }

            return res.status(200).send(exercises);
        });
    });
};

// <exports> ------------------------------------------------
exports.createExercise = createExercise;
exports.getExercises = getExercises;
// </exports> ------------------------------------------------
