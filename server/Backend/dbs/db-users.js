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
            return callback(common.getError(2001), null)
        } else {
            return callback(null, user);
        }
    });
};
    
// <exports> -----------------------------------
exports.createUser = createUser;
exports.getUserByUsername = getUserByUsername;
// </exports> -----------------------------------
