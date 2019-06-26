const users_api = require('./api-components/users-api.js');

// <Users Requests> ------------------------------------------------
exports.handleLoginPath = users_api.login;
exports.handleUsersCreatePath = users_api.createUser;
// </Users Requests> ------------------------------------------------
