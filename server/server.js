const bodyParsesr = require('body-parser');
const cors = require('cors');
const express = require('express');

const api = require('./API/api-handler.js');
const common = require('./common.js');
const config = require('./config.js')
const db = require('./Backend/db.js');

const app = express();

app.use(cors());

app.use(bodyParsesr.urlencoded({
    extended: false
}));
app.use(bodyParsesr.json());

// Start the server
app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}...`);

    // Initialize the database connection
    db.initialize((err, result) => {
        if (err) {
            console.log(JSON.stringify(err));
            process.exit(1);
        }

        console.log('Connected to the database');        
    });
});

// <Get Requests> -----------------------------------------------
app.get('/exercises/custom/_query', common.setVerificationToken, api.handleExercisesCustomQueryPath);
app.get('/exercises/predefined/_query', common.setVerificationToken, api.handleExercisesPredefinedQueryPath);
app.get('/me', common.setVerificationToken, api.handleGetMePath);
app.get('/users/profile', common.setVerificationToken, api.handleUsersGetProfilePath);
// </Get Requests> -----------------------------------------------

// <Post Requests> -----------------------------------------------
app.post('/login', api.handleLoginPath);
app.post('/users/updatePassword', common.setVerificationToken, api.handleUsersUpdatePassword);
app.post('/users/updateProfile', common.setVerificationToken, api.handleUsersUpdateProfile);
// </Post Requests> -----------------------------------------------

// <Put Requests> -----------------------------------------------
app.put('/exercises/create', common.setVerificationToken, api.handleExercisesCreatePath);
app.put('/users/create', api.handleUsersCreatePath);
// </Put Requests> -----------------------------------------------

// <Delete Requests> -----------------------------------------------
// </Delete Requests> -----------------------------------------------