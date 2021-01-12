const xss = require('xss');

const common = require('../../common.js');
const workoutInProgress = require('../../Backend/workout-in-progress');

/**
 * Create a workout in progress
 *
 * @param {Object} req
 * @param {Object} res
 */
const createWorkoutInProgress = (req, res) => {
    common.verifyToken (req, res, (req, res) => {
        const userId = req.authData.signObject._id;
        const workoutId = xss(req.body.workoutId);
        const workoutStartTime = xss(req.body.workoutStartTime);
        const exerciseProgress = req.body.exerciseProgress;

        const createdWorkoutInProgress = {
            workoutId,
            workoutStartTime,
            exerciseProgress,
            creatorId: userId
        };

        workoutInProgress.createWorkoutInProgress(createdWorkoutInProgress, (err, workoutInProgressObject) => {
            if (err) {
                return res.status(common.getStatus(err)).send(err);
            }

            return res.status(200).send(workoutInProgressObject);
        });
    });
};

/**
 * Edit a workout in progress
 *
 * @param {Object} req
 * @param {Object} res
 */
const editWorkoutInProgress = (req, res) => {
    const workoutInProgressId = req.params.id;

    common.verifyToken (req, res, (req, res) => {
        const userId = req.authData.signObject._id;
        const workoutId = xss(req.body.workoutId);
        const workoutStartTime = xss(req.body.workoutStartTime);
        const exerciseProgress = req.body.exerciseProgress;

        const updatedWorkoutInProgress = {
            workoutId,
            workoutStartTime,
            exerciseProgress,
            createorId: userId
        };

        workoutInProgress.editWorkoutInProgress(workoutInProgressId, updatedWorkoutInProgress, (err, updatedWorkoutInProgressObject) => {
            if (err) {
                return res.status(common.getStatus(err)).send(err);
            }

            return res.status(200).send(updatedWorkoutInProgressObject);
        });
    });
};

/**
 * Delete a workout in progress
 *
 * @param {Object} req
 * @param {Object} res
 */
const deleteWorkoutInProgress = (req, res) => {
    common.verifyToken (req, res, (req, res) => {
        const workoutInProgressId = req.params.id;

        workoutInProgress.deleteWorkoutInProgress(workoutInProgressId, (err, _) => {
            if (err) {
                return res.status(common.getStatus(err)).send(err);
            }

            return res.status(200).send({});
        });
    });
};

/**
 * Get workout in progress
 *
 * @param {Object} req
 * @param {Object} res
 */
const getWorkoutInProgress = (req, res) => {
    common.verifyToken (req, res, (req, res) => {
        const workoutInProgressId = req.params.id;

        workoutInProgress.getWorkoutInProgress(workoutInProgressId, (err, workoutInProgressObject) => {
            if (err) {
                return res.status(common.getStatus(err)).send(err);
            }

            return res.status(200).send(workoutInProgressObject);
        });
    });
};

/**
 * Get all workouts in progress
 *
 * @param {Object} req
 * @param {Object} res
 */
const getAllWorkoutsInProgress = (req, res) => {
    common.verifyToken (req, res, (req, res) => {
        const userId = req.authData.signObject._id;

        workoutInProgress.getAllWorkoutsInProgress(userId, (err, workoutsInProgressObject) => {
            if (err) {
                return res.status(common.getStatus(err)).send(err);
            }

            return res.status(200).send(workoutsInProgressObject);
        });
    });
};

// <exports> ------------------------------------------------
exports.createWorkoutInProgress = createWorkoutInProgress;
exports.editWorkoutInProgress = editWorkoutInProgress;
exports.deleteWorkoutInProgress = deleteWorkoutInProgress;
exports.getWorkoutInProgress = getWorkoutInProgress;
exports.getAllWorkoutsInProgress = getAllWorkoutsInProgress;
// </exports> ------------------------------------------------
