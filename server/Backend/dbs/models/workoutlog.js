const mongoose = require('mongoose');

// workoutlog Schema
let workoutlogSchema = mongoose.Schema({
    _id: String,
    configuration: mongoose.Mixed,
    creatorId: String,
    workoutId: String,
    durationInSeconds: Number,
    loggedDate: Date
});

let workoutlog = module.exports = mongoose.model('workoutlog', workoutlogSchema);
