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
app.get('/exercises', common.setVerificationToken, api.handleExercisesGetPath);
app.get('/histories', common.setVerificationToken, api.handleHistoriesGetPath);
app.get('/me', common.setVerificationToken, api.handleGetMePath);
app.get('/workoutlogs/:id', common.setVerificationToken, api.handleLatestWorkoutslogsGetPath);
app.get('/workouts', common.setVerificationToken, api.handleWorkoutsGetPath);
// app.get('/users/profile', common.setVerificationToken, api.handleUsersGetProfilePath);
// </Get Requests> -----------------------------------------------

// <Post Requests> -----------------------------------------------
app.post('/login', api.handleLoginPath);
app.post('/workoutlogs', common.setVerificationToken, api.handleWorkoutsLogPath);
app.post('/users/create', api.handleUsersCreatePath);
app.post('/exercises', common.setVerificationToken, api.handleExercisesCreatePath);
app.post('/workouts', common.setVerificationToken, api.handleWorkoutsCreatePath);
// </Post Requests> -----------------------------------------------

// <Put Requests> -----------------------------------------------
// app.post('/users/updatePassword', common.setVerificationToken, api.handleUsersUpdatePassword);
// app.post('/users/updateProfile', common.setVerificationToken, api.handleUsersUpdateProfile);
app.put('/workouts/:id', common.setVerificationToken, api.handleWorkoutsEditPath);
// </Put Requests> -----------------------------------------------

// <Delete Requests> -----------------------------------------------
app.delete('/histories/:id', common.setVerificationToken, api.handleHistoriesDeletePath);
// </Delete Requests> -----------------------------------------------