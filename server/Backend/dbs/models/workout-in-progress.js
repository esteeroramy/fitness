const mongoose = require('mongoose');

// Workout In Progress Schema
let workoutInProgressSchema = mongoose.Schema({
    _id: String,
    creatorId: String,
    exerciseProgress: mongoose.Mixed,
    workoutId: String,
    workoutStartTime: Date
});

let WorkoutInProgress = module.exports = mongoose.model('WorkoutInProgress', workoutInProgressSchema);
