const common = require('../../common.js');
const users = require('../../Backend/users.js');

/**
 * Creates a new user
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
const createUser = (req, res) => {
    const newUser = {
        ctime: req.body.ctime,
        email: req.body.email,
        fname: req.body.fname,
        lname: req.body.lname,
        mtime: req.body.mtime,
        password: req.body.password,
        unit: req.body.unit,
        username: req.body.username,
        weight: req.body.weight
    };

    users.createUser(newUser, (err, userObject) => {
        if (err) {
            return res.status(common.getStatus(err)).send(err);
        }

        return res.status(200).send('ok');
    });
};

/**
 * Logs in a user if the params are valid
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.login(username, password, (err, userObject) => {
        if (err) {
            return res.status(common.getStatus(err)).send(err);
        }

        return res.status(200).send('ok');
    });
};

// <exports> ------------------------------------------------
exports.createUser = createUser;
exports.login = login;
// </exports> ------------------------------------------------
