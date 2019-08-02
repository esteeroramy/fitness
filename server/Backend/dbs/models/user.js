const mongoose = require('mongoose');

const common = require('../../../common.js');

const measuringUnits = Object.values(common.measuringUnits);

// User Schema
let userSchema = mongoose.Schema({
    _id: String,
    ctime: Date,
    email: String,
    fname: String,
    lname: String,
    mtime: Date,
    password: String,
    unit: {
        type: String,
        enum: measuringUnits
    },
    username: String,
    weight: Number
});

let user = module.exports = mongoose.model('User', userSchema);
