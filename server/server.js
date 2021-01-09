const bodyParsesr = require('body-parser');
const cors = require('cors');
const express = require('express');

const api = require('./API/api-handler.js');
const common = require('./common.js');
const config = require('./config.js')
const db = require('./Backend/db.js');

const app = express();

app.use(cors());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

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
app.get('/api/exercises', common.setVerificationToken, api.handleExercisesGetPath);
app.get('/api/histories', common.setVerificationToken, api.handleHistoriesGetPath);
app.get('/api/me', common.setVerificationToken, api.handleGetMePath);
app.get('/api/progressPhotos', common.setVerificationToken, api.handleGetProgressPhotosPath);
app.get('/api/workoutlogs/:id', common.setVerificationToken, api.handleLatestWorkoutslogsGetPath);
app.get('/api/workouts', common.setVerificationToken, api.handleWorkoutsGetPath);
// app.get('/api/users/profile', common.setVerificationToken, api.handleUsersGetProfilePath);
// </Get Requests> -----------------------------------------------

// <Post Requests> -----------------------------------------------
app.post('/api/exercises', common.setVerificationToken, api.handleExercisesCreatePath);
app.post('/api/login', api.handleLoginPath);
app.post('/api/users/create', api.handleUsersCreatePath);
app.post('/api/workoutlogs', common.setVerificationToken, api.handleWorkoutsLogPath);
app.post('/api/progressphotos', common.setVerificationToken, api.handleCreateProgressPhotosPath);
app.post('/api/workouts', common.setVerificationToken, api.handleWorkoutsCreatePath);
// </Post Requests> -----------------------------------------------

// <Put Requests> -----------------------------------------------
// app.post('/api/users/updatePassword', common.setVerificationToken, api.handleUsersUpdatePassword);
// app.post('/api/users/updateProfile', common.setVerificationToken, api.handleUsersUpdateProfile);
app.put('/api/workouts/:id', common.setVerificationToken, api.handleWorkoutsEditPath);
// </Put Requests> -----------------------------------------------

// <Delete Requests> -----------------------------------------------
app.delete('/api/histories/:id', common.setVerificationToken, api.handleHistoriesDeletePath);
app.delete('/api/workouts/:id', common.setVerificationToken, api.handleWorkoutsDeletePath);
// </Delete Requests> -----------------------------------------------