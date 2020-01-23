const common = require('../../common.js');
const user = require('./models/user');

/**
 * Creates a user on the database
 * 
 * @param {Object} userObject 
 * @param {Function} callback 
 * @returns {Function}
 */
const createUser = function(userObject, callback) {
    let newUser = new user();

    newUser._id = userObject._id;
    newUser.ctime = userObject.ctime;
    newUser.email = userObject.email;
    newUser.fname = userObject.fname;
    newUser.lname = userObject.lname;
    newUser.mtime = userObject.mtime;
    newUser.password = userObject.password;
    newUser.username = userObject.username;

    newUser.save(function(err) {
        if (err) {
            return callback(common.getError(2000), null);
        }

        return callback(null, newUser);
    });
};

/**
 * Finds a user given their username
 * 
 * @param {Object} searchQuery 
 * @param {Function} callback 
 * @returns {Function}
 */
const getUserByUsername = function (searchQuery, callback) {
    const { username } = searchQuery; 

    user.findOne({ username }, function(err, user) {
        if (err) {
            return callback(common.getError(2001), null);
        }

        return callback(null, user);
    });
};

/**
 * Returns the user object based on the userId
 * 
 * @param {Object} searchQuery 
 * @param {Function} callback 
 * @returns {Function}
 */
const getUserById = function (searchQuery, callback) {
    const { userId } = searchQuery;

    user.findOne({ _id: userId }, function(err, user) {
        if (err) {
            return callback(common.getError(2001), null);
        }

        return callback(null, user);
    });
}

/**
 * Updates a user's profile based on the userId
 * 
 * @param {Object} searchQuery 
 * @param {Function} callback 
 */
const updateById = function(searchQuery, callback) {
    const { userId , userProfile} = searchQuery;

    user.findOneAndUpdate({ _id: userId }, userProfile, function(err, user) {
        if (err) {
            return callback(common.getError(2001), null);
        }

        return callback(null, user);
    });
}

// <exports> -----------------------------------
exports.createUser = createUser;
exports.getUserById = getUserById;
exports.getUserByUsername = getUserByUsername;
exports.updateById = updateById;
// </exports> -----------------------------------
