const date = require('moment');

/**
 * Errors
 * 
 * 1000 -> system
 * 2000 -> users
 */
const errors = Object.freeze({
    // system
    1000: 'invalid request',
    1001: 'failed to connect to the database',
    1002: 'failed to hash password',

    //users
    2000: 'failed to save user, database issue',
    2001: 'failed to find user, database issue',
    2002: 'invalid user parameters',
    2003: 'user already exists in the database',
    2004: 'incorrect username or password'
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
    2004: 404
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
    }

    // unknown error
    return 520;
};
exports.getStatus = getStatus;

/**
 * Checks if a string is empty
 *
 * @param {String} text string to check if its empty
 * @return {Boolean}
 */
const isEmptyString = function(text) {
    return text.trim().length === 0;
};
exports.isEmptyString = isEmptyString;