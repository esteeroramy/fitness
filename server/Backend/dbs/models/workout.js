const mongoose = require('mongoose');

const common = require('../../../common.js');

const workoutTypes = Object.values(common.workoutTypes);

// Workout Schema
let workoutSchema = mongoose.Schema({
    _id: String,
    configuration: mongoose.Mixed,
    creatorId: String,
    name: String,
    type: {
        type: String,
        enum: workoutTypes
    }
});

let workout = module.exports = mongoose.model('Workout', workoutSchema);
