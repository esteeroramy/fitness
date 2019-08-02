const bodyParsesr = require('body-parser');
const cors = require('cors');
const express = require('express');

const api = require('./API/api-handler.js');
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
// </Get Requests> -----------------------------------------------

// <Post Requests> -----------------------------------------------
app.post('/login', api.handleLoginPath);
app.post('/users/create', api.handleUsersCreatePath);
// </Post Requests> -----------------------------------------------

// <Put Requests> -----------------------------------------------
// </Put Requests> -----------------------------------------------

// <Delete Requests> -----------------------------------------------
// </Delete Requests> -----------------------------------------------