const date = require('moment');
const jwt = require('jsonwebtoken');
const uuidv1 = require('uuid/v1');

const config = require('./config.js');

/**
 * Errors
 *
 * 1000 -> system
 * 2000 -> users
 * 3000 -> exercises
 * 4000 -> workouts
 * 5000 -> workoutlogs
 */
const errors = Object.freeze({
    // system
    1000: 'invalid request',
    1001: 'failed to connect to the database',
    1002: 'failed to hash password',

    // users
    2000: 'failed to save user, database issue',
    2001: 'failed to find user, database issue',
    2002: 'invalid user parameters',
    2003: 'user already exists in the database',
    2004: 'incorrect username or password',
    2005: 'failed to start session',
    2006: 'invalid login parameters',
    2007: 'invalid password parameter',
    2008: 'old password is incorrect',

    // exercises
    3000: 'failed to save exercise, database issue',
    3001: 'failed to find exercise, database issue',
    3002: 'invalid exercise parameters',
    3003: 'failed to query exercises, database issue',

    // workouts
    4000: 'failed to save workout, database issue',
    4001: 'invalid workout parameters',
    4002: 'failed to query workouts, database issue',
    4003: 'failed to find workout, database issue',
    4004: 'failed to update workout, database issue',

    // workoutlogs
    5000: 'failed to save workoutlog, database issue',
    5001: 'failed to get workoutlog, database issue',
    5002: 'failed to delete workoutlog, database issue'
});
exports.errors = errors;

// Mapping between error codes and return status
const errorStatusCodes = Object.freeze({
    // system
    1000: 404,
    1001: 500,
    1002: 500,

    // users
    2000: 500,
    2001: 500,
    2002: 422,
    2003: 409,
    2004: 404,
    2005: 500,
    2006: 422,
    2007: 422,
    2008: 422,

    // exercises
    3000: 500,
    3001: 500,
    3002: 422,
    3003: 500,

    // workouts
    4000: 500,
    4001: 422
})
exports.errorStatusCodes = errorStatusCodes;

const defaultError = 'unknown error';
exports.defaultError = defaultError;

// Measuring units
const measuringUnits = Object.freeze({
    KG: 'kg',
    LB: 'lb'
});
exports.measuringUnits = measuringUnits;

// Variable types
const variableTypes = Object.freeze({
    ARRAY: 'array',
    BOOLEAN: 'boolean',
    NUMBER: 'number',
    OBJECT: 'object',
    STRING: 'string',
    UNDEFINED: 'undefined'
});
exports.variableTypes = variableTypes;

// Weights options
const weights = Object.freeze({
    BARBELL: 'barbell',
    BODYWEIGHT: 'bodyWeight',
    CABLE: 'cable',
    DUMBBELL: 'dumbbell',
    FREEWEIGHT: 'freeWeight',
    KETTLEBELL: 'kettlebell',
    MACHINE: 'machine',
    MEDICINEBALL: 'medicineBall',
    RESISTANCEBAND: 'resistanceBand'
});
exports.weights = weights;

// workout types
const workoutTypes = Object.freeze({
    CARDIO: 'cardio',
    WEIGHTS: 'weights'
});
exports.workoutTypes = workoutTypes;

/**
 * Returns the current date
 *
 * @return {String} date formatted as YYYY-MM-DD hh:mm:ss A
 */
const getDate = function () {
    return getDateFormatted('YYYY-MM-DD hh:mm:ss A');
};
exports.getDate = getDate;

/**
 * Returns the current date formatted
 *
 * @param {string} format date format
 * @return {string} date formatted
 */
const getDateFormatted = function(format) {
    return date().format(format);
};
exports.getDateFormatted = getDateFormatted;

/**
 * Returns an object of error code and its message
 *
 * @param {Number} errorCode the error number
 * @return {Object} object of the error and its message
 */
const getError = function(errorCode) {
    return {
        code: errorCode,
        message: errors[errorCode] || defaultError
    };
};
exports.getError = getError;

/**
 * Returns the status code of an error object
 * 
 * @param {Object} errorObject 
 * @returns {Number} The status code
 */
const getStatus = function(errorObject) {
    const { code, message } = errorObject;

    if (typeof(errorObject) === variableTypes.OBJECT &&
        typeof(code) === variableTypes.NUMBER &&
        typeof(message) === variableTypes.STRING &&
        errors[code] === errorObject.message) {
            return errorStatusCodes[code];
    } else if (typeof(errorObject) === variableTypes.NUMBER) {
        return errorStatusCodes[errorObject];
    }

    // unknown error
    return 520;
};
exports.getStatus = getStatus;

/**
 * Returns a unique ID
 * 
 * @returns {String} The ID
 */
const getUUID = function() {
    return uuidv1();
};
exports.getUUID = getUUID;

/**
 * Checks if a string is empty
 *
 * @param {String} text string to check if its empty
 * @returns {Boolean}
 */
const isEmptyString = function(text) {
    return text.trim().length === 0;
};
exports.isEmptyString = isEmptyString;

/**
 * Checks if an email is valid
 *
 * @param {String} text email to check
 * @returns {Boolean}
 */
const isValidEmail = function(email) {
    return /\S+@\S+\.\S+/.test(email);
};
exports.isValidEmail = isValidEmail;

/**
 * Verifies that the token is valid
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
const setVerificationToken = function(req, res, next) {
    const bearerHeader = req.headers.authorization;

    if (bearerHeader === undefined) {
        return res.sendStatus(403);
    }

    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;

    next();
}
exports.setVerificationToken = setVerificationToken;

/**
 * Verifies that a token is valid. If it is the callback function is called.
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} callback 
 */
const verifyToken = function(req, res, callback) {
    jwt.verify(req.token, config.secret, (err, authData) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.authData = authData;

        callback(req, res);
    })
}
exports.verifyToken = verifyToken;
