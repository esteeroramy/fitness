const mongoose = require('mongoose');

const common = require('../../../common.js');

const weights = Object.values(common.weights);

// Exercise Schema
let exerciseSchema = mongoose.Schema({
    _id: String,
    creatorId: String,
    name: String,
    weight: {
        type: String,
        enum: weights
    }
});

let exercise = module.exports = mongoose.model('Exercise', exerciseSchema);
