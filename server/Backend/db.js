const mongoose = require('mongoose');

const common = require('../common.js');
const config = require('./config.js');
const db_users = require('./dbs/db-users.js');

/**
 * Initializes the connection to the database
 * 
 * @param {Function} callback
 * @returns {Function} callback
 */
const initialize = function(callback) {
    mongoose.connect(`mongodb://${config.hostName}/${config.dbName}`, function(err, client) {
        if (err) {
            return callback(common.getError(1001), null);
        }

        return callback(null, 'ok');        
    });
};

exports.initialize = initialize;

// <Users Collection> -------------------------------------------------
exports.createUser = db_users.createUser;
exports.getUserById = db_users.getUserById;
exports.getUserByUsername = db_users.getUserByUsername;
exports.updateById = db_users.updateById;
// </Users Collection> -------------------------------------------------
