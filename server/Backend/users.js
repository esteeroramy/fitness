const bcrypt = require('bcryptjs');

const common = require('../common.js');
const db = require('./db.js');

/**
 * Creates a new user only if no duplicate user exists
 * 
 * @param {Object} userObject 
 * @param {Function} callback 
 * @returns {Function} callback
 */
const createUser = function(userObject, callback) {
    const measuringUnits = Object.values(common.measuringUnits);
    const { 
        email,
        fname,
        lname,
        password,
        unit,
        username,
        weight = 0
    } = userObject;

    if (typeof(email) !== common.variableTypes.STRING ||
        typeof(fname) !== common.variableTypes.STRING ||
        typeof(lname) !== common.variableTypes.STRING ||
        typeof(password) !== common.variableTypes.STRING ||
        typeof(unit) !== common.variableTypes.STRING ||
        typeof(username) !== common.variableTypes.STRING ||
        typeof(weight) !== common.variableTypes.NUMBER ||
        common.isEmptyString(email) ||
        common.isEmptyString(fname) ||
        common.isEmptyString(lname) ||
        common.isEmptyString(password) ||
        common.isEmptyString(unit) ||
        common.isEmptyString(username) ||
        !measuringUnits.includes(unit)) {
            return callback(common.getError(2002), null);
    }

    bcrypt.hash(password, 11, function(err, hash) {
        if (err) {
            return callback(common.getError(1002), null);
        }

        const currentDate = common.getDate();
    
        userObject.ctime = currentDate;
        userObject.mtime = currentDate;
        userObject.password = hash;

        db.getUserByUsername({ username }, (err, existingUser) => {
            if (err) {
                return callback(err, null);
            }
    
            // If the user already exists in the database
            if (existingUser) {
                return callback(common.getError(2003), null);
            }
    
            db.createUser(userObject, (err, createdUser) => {
                if (err) {
                    return callback(err, null);
                }
    
                return callback(null, createdUser);
            });
        });
    });
};

/**
 * Verify if a user can log in
 * 
 * @param {String} username 
 * @param {String} password 
 * @param {Function} callback 
 * @returns {Function} callback
 */
const login = function(username, password, callback) {
    db.getUserByUsername({ username }, (err, userObject) => {
        if (err) {
            return callback(err, null);
        }

        if (userObject) {
            bcrypt.compare(password, userObject.password, function(err, valid) {
                if (err) {
                    return callback(common.getError(1002), null);
                }

                if (!valid) {
                    return callback(common.getError(2004), null);
                }

                return callback(null, userObject);
            });
        } else {
            return callback(common.getError(2004), null);
        }
    });
};

// <exports> -----------------------------------
exports.createUser = createUser;
exports.login = login;
// </exports> -----------------------------------
