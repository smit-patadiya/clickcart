const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require("moment");
const SALT_I = 10;
require('dotenv').config();

const storeSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

});

module.exports = Store = mongoose.model('Store', storeSchema);