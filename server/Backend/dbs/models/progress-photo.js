const mongoose = require('mongoose');

// Progress Photo Schema
let progressPhotoSchema = mongoose.Schema({
    _id: String,
    creatorId: String,
    workoutId: String,
    notes: String,
    date: Date
});

let ProgressPhoto = module.exports = mongoose.model('ProgressPhoto', progressPhotoSchema);
