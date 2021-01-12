const bcrypt = require('bcryptjs');

const common = require('../common.js');
const db = require('./db.js');

/**
 * Creates a new user only if no duplicate user exists
 * 
 * @param {Object} userObject 
 * @param {Function} callback 
 * @returns {Function}
 */
const createUser = function(userObject, callback) {
    const { 
        password,
        username,
    } = userObject;

    bcrypt.hash(password, 11, function(err, hash) {
        if (err) {
            return callback(common.getError(1002), null);
        }

        const currentDate = common.getDate();
    
        userObject.ctime = currentDate;
        userObject.mtime = currentDate;
        userObject.password = hash;
        userObject._id = common.getUUID();

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
 * @returns {Function}
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

/**
 * Gets the user profile
 * 
 * @param {String} userId
 * @param {Function} callback
 * @returns {Function}
 */
const getProfile = function(userId, callback) {
    db.getUserById({ userId }, (err, userObject) => {
        if (err) {
            return callback(err, null);
        }

        if (userObject) {
            const userProfile = {
                email: userObject.email,
                fname: userObject.fname,
                lname: userObject.lname,
                username: userObject.username
            };

            return callback(null, userProfile);
        } else {
            return callback(common.getError(2001), null);
        }
    });
};

/**
 * Gets the me object for a user
 * 
 * @param {String} userId
 * @param {Function} callback
 * @returns {Function}
 */
const getMe = function(userId, callback) {
    db.getUserById({ userId }, (err, meObject) => {
        if (err) {
            return callback(err, null);
        }

        if (meObject) {
            const userMeObject = {
                id: meObject._id,
                email: meObject.email,
                fname: meObject.fname,
                lname: meObject.lname,
                username: meObject.username
            };

            db.getWorkoutInProgressByUserId(userId, (err, workoutsInProgress) => {
                if (err) {
                    return callback(err, null);
                }

                userMeObject.hasWorkoutsInProgress = workoutsInProgress.length > 0;

                return callback(null, userMeObject);
            });
        } else {
            return callback(common.getError(2001), null);
        }
    });
};

/**
 * Updates the user profile
 * 
 * @param {String} userId 
 * @param {Object} userProfile 
 * @param {Function} callback 
 */
const updateUserProfile = function(userId, userProfile, callback) {
    db.updateById({ userId, userProfile }, (err, userObject) => {
        if (err) {
            return callback(err, null);
        }

        if (userObject) {
            return callback(null, userObject);
        } else {
            return callback(common.getError(2001), null);
        }
    });
};

const updatePassword = function(userId, passwordObject, callback) {
    db.getUserById({ userId }, (err, userObject) => {
        if (err) {
            return callback(err);
        }

        if (userObject) {
            bcrypt.compare(passwordObject.oldPassword, userObject.password, function(err, valid) {
                if (err) {
                    return callback(common.getError(1002));
                }

                if (!valid) {
                    return callback(common.getError(2008));
                }

                bcrypt.hash(passwordObject.newPassword, 11, function(err, hash) {
                    if (err) {
                        return callback(common.getError(1002));
                    }
                    
                    userProfile = { password: hash};

                    db.updateById({ userId, userProfile }, (err, userObject) => {
                        if (err) {
                            return callback(err);
                        }

                        if (userObject) {
                            return callback(null);
                        } else {
                            return callback(common.getError(2001));
                        }
                    });
                });
            });
        } else {
            return callback(common.getError(2001));
        }
    });
};

// <exports> -----------------------------------
exports.createUser = createUser;
exports.getProfile = getProfile;
exports.login = login;
exports.getMe = getMe;
exports.updatePassword = updatePassword;
exports.updateUserProfile = updateUserProfile;
// </exports> -----------------------------------
