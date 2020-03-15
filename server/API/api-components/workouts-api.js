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

            return res.status(200).send('ok');
        });
    });
};

// <exports> ------------------------------------------------
exports.createWorkout = createWorkout;
// </exports> ------------------------------------------------
