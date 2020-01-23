const jwt = require('jsonwebtoken');
const xss = require('xss');

const common = require('../../common.js');
const users = require('../../Backend/users.js');
const config = require('../../config.js')

/**
 * Creates a new user
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
const createUser = (req, res) => {
    const confirmedPassword = xss(req.body.confirmedPassword);
    const email = xss(req.body.email);
    const fname = xss(req.body.fname);
    const lname = xss(req.body.lname);
    const password = xss(req.body.password);
    const username = xss(req.body.username);

    if (typeof(email) !== common.variableTypes.STRING ||
        typeof(fname) !== common.variableTypes.STRING ||
        typeof(lname) !== common.variableTypes.STRING ||
        typeof(password) !== common.variableTypes.STRING ||
        typeof(username) !== common.variableTypes.STRING ||
        common.isEmptyString(email) ||
        common.isEmptyString(fname) ||
        common.isEmptyString(lname) ||
        common.isEmptyString(password) ||
        common.isEmptyString(username) ||
        !common.isValidEmail(email) ||
        password !== confirmedPassword) {
            return res.status(common.getStatus(2002)).send(common.getError(2002));
    }

    const newUser = {
        email,
        fname,
        lname,
        password,
        username
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
    const username = xss(req.body.username);
    const password = xss(req.body.password);

    if (typeof(username) !== common.variableTypes.STRING ||
        typeof(password) !== common.variableTypes.STRING ||
        common.isEmptyString(username) ||
        common.isEmptyString(password)) {
            return res.status(common.getStatus(2006)).send(common.getError(2006));
    }

    users.login(username, password, (err, userObject) => {
        if (err) {
            return res.status(common.getStatus(err)).send(err);
        }

        const {
            _id,
            username
        } = userObject;

        const signObject = {
            _id,
            username
        };

        jwt.sign({ signObject }, config.secret, { expiresIn: '365d' }, (err, token) => {
            if (err) {
                return res.status(common.getStatus(2005)).send(err);
            }

            return res.status(200).send({
                access_token : token
            });
        });
    });
};

/**
 * Gets the profile of the user
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
const getProfile = (req, res) => {
    common.verifyToken (req, res, (req, res) => {
        const userId = req.authData.signObject._id;

        users.getProfile(userId, (err, userProfile) => {
            if (err) {
                return res.status(common.getStatus(err)).send(err);
            }

            return res.status(200).send(userProfile);
        });
    });
};

/**
 * Gets the me object of the user
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
const me = (req, res) => {
    common.verifyToken (req, res, (req, res) => {
        const userId = req.authData.signObject._id;

        users.getMe(userId, (err, meObject) => {
            if (err) {
                return res.status(common.getStatus(err)).send(err);
            }

            return res.status(200).send(meObject);
        });
    });
};

/**
 * Updates the user profile
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
const updateProfile = (req, res) => {
    common.verifyToken (req, res, (req, res) => {
        const userId = req.authData.signObject._id;
        const email = xss(req.body.email);
        const fname = xss(req.body.fname);
        const lname = xss(req.body.lname);

        if (typeof(email) !== common.variableTypes.STRING ||
            typeof(fname) !== common.variableTypes.STRING ||
            typeof(lname) !== common.variableTypes.STRING ||
            common.isEmptyString(email) ||
            common.isEmptyString(fname) ||
            common.isEmptyString(lname) ||
            !common.isValidEmail(email)) {
                return res.status(common.getStatus(2002)).send(common.getError(2002));
        }

        const newUserProfile = {
            email,
            fname,
            lname
        };

        users.updateUserProfile(userId, newUserProfile, (err, userObject) => {
            if (err) {
                return res.status(common.getStatus(err)).send(err);
            }
    
            return res.status(200).send('ok');
        });
    });
};

// <exports> ------------------------------------------------
exports.createUser = createUser;
exports.login = login;
exports.getProfile = getProfile;
exports.me = me;
exports.updateProfile = updateProfile;
// </exports> ------------------------------------------------
