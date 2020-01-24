const users_api = require('./api-components/users-api.js');

// <Users Requests> ------------------------------------------------
exports.handleLoginPath = users_api.login;
exports.handleGetMePath = users_api.me;
exports.handleUsersCreatePath = users_api.createUser;
exports.handleUsersGetProfilePath = users_api.getProfile;
exports.handleUsersUpdatePassword = users_api.updatePassword;
exports.handleUsersUpdateProfile = users_api.updateProfile;
// </Users Requests> ------------------------------------------------
