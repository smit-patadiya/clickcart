const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require("moment");
const SALT_I = 10;
require('dotenv').config();

const storeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

storeSchema.pre('save', function (next) {
    var store = this;

    if (store.isModified('name')) {
        store.name = store.name.toLowerCase();
        next();
    } else {
        next()
    }
})

const Store = mongoose.model('Store', storeSchema);

module.exports = { Store }