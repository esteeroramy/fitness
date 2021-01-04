const xss = require('xss');

const common = require('../../common.js');
const workouts = require('../../Backend/workouts.js');

/**
 * Create a new workout
 *
 * @param {Object} req
 * @param {Object} res
 */
const createWorkout = (req, res) => {
    common.verifyToken (req, res, (req, res) => {
        const userId = req.authData.signObject._id;
        const name = xss(req.body.name);
        const type = xss(req.body.type);
        const configuration = req.body.configuration;

        const workoutTypes = Object.values(common.workoutTypes);

        if (typeof(name) !== common.variableTypes.STRING ||
            typeof(type) !== common.variableTypes.STRING ||
            common.isEmptyString(name) ||
            common.isEmptyString(type) ||
            !(workoutTypes.includes(type))) {
                return res.status(common.getStatus(4001)).send(common.getError(4001));
        }

        const newWorkout = {
            name,
            type,
            configuration
        };

        workouts.createWorkout(userId, newWorkout, (err, workoutObject) => {
            if (err) {
                return res.status(common.getStatus(err)).send(err);
            }

            return res.status(200).send(workoutObject);
        });
    });
};

/**
 * Edit a workout
 *
 * @param {Object} req
 * @param {Object} res
 */
const editWorkout = (req, res) => {
    const workoutId = req.params.id;

    common.verifyToken (req, res, (req, res) => {
        const name = xss(req.body.name);
        const type = xss(req.body.type);
        const configuration = req.body.configuration;

        const workoutTypes = Object.values(common.workoutTypes);

        if (typeof(name) !== common.variableTypes.STRING ||
            typeof(type) !== common.variableTypes.STRING ||
            common.isEmptyString(name) ||
            common.isEmptyString(type) ||
            !(workoutTypes.includes(type))) {
                return res.status(common.getStatus(4001)).send(common.getError(4001));
        }

        const updatedWorkout = {
            name,
            type,
            configuration
        };

        workouts.editWorkout(workoutId, updatedWorkout, (err, workoutObject) => {
            if (err) {
                return res.status(common.getStatus(err)).send(err);
            }

            return res.status(200).send(workoutObject);
        });
    });
};

/**
 * returns the list of workouts
 *
 * @param {Object} req
 * @param {Object} res
 */
const getWorkouts = (req, res) => {
    common.verifyToken (req, res, (req, res) => {
        const userId = req.authData.signObject._id;

        workouts.getWorkouts(userId, (err, workouts) => {
            if (err) {
                return res.status(common.getStatus(err)).send(err);
            }

            return res.status(200).send(workouts);
        });
    });
};

/**
 * log a workout
 *
 * @param {Object} req
 * @param {Object} res
 */
const logWorkout = (req, res) => {
    common.verifyToken (req, res, (req, res) => {
        const userId = req.authData.signObject._id;
        const workoutId = xss(req.body.workoutId);
        const durationInSeconds = xss(req.body.durationInSeconds);
        const loggedDate = xss(req.body.loggedDate);
        const configuration = req.body.configuration;

        const workoutLog = {
            workoutId,
            durationInSeconds,
            loggedDate,
            configuration
        };

        workouts.logWorkout(userId, workoutLog, (err, workouts) => {
            if (err) {
                return res.status(common.getStatus(err)).send(err);
            }

            return res.status(200).send(workouts);
        });
    });
};

/**
 * Gets the latest workout log
 *
 * @param {Object} req
 * @param {Object} res
 */
const getLatestWorkoutslog = (req, res) => {
    const workoutId = req.params.id;

    common.verifyToken (req, res, (req, res) => {
        workouts.getLatestWorkoutslog(workoutId, (err, log) => {
            if (err) {
                return res.status(common.getStatus(err)).send(err);
            }

            return res.status(200).send(log);
        });
    });
};

/**
 * Gets the history for the user
 *
 * @param {Object} req
 * @param {Object} res
 */
const getHistories = (req, res) => {
    common.verifyToken (req, res, (req, res) => {
        const userId = req.authData.signObject._id;

        workouts.getHistories(userId, (err, history) => {
            if (err) {
                return res.status(common.getStatus(err)).send(err);
            }

            return res.status(200).send(history);
        })
    });
};

/**
 * Delete a history object
 *
 * @param {Object} req
 * @param {Object} res
 */
const deleteHistories = (req, res) => {
    const logId = req.params.id;

    common.verifyToken (req, res, (req, res) => {
        workouts.deleteHistories(logId, (err, _) => {
            if (err) {
                return res.status(common.getStatus(err)).send(err);
            }

            return res.status(200).send({});
        })
    });
};

/**
 * Delete a workout object
 *
 * @param {Object} req
 * @param {Object} res
 */
const deleteWorkout = (req, res) => {
    const workoutId = req.params.id;

    common.verifyToken (req, res, (req, res) => {
        workouts.deleteWorkout(workoutId, (err, _) => {
            if (err) {
                return res.status(common.getStatus(err)).send(err);
            }

            return res.status(200).send({});
        })
    });
};

// <exports> ------------------------------------------------
exports.createWorkout = createWorkout;
exports.editWorkout = editWorkout;
exports.getWorkouts = getWorkouts;
exports.logWorkout = logWorkout;
exports.getLatestWorkoutslog = getLatestWorkoutslog;
exports.getHistories = getHistories;
exports.deleteHistories = deleteHistories;
exports.deleteWorkout = deleteWorkout;
// </exports> ------------------------------------------------
