const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require("moment");
const SALT_I = 10;
require('dotenv').config();

const categorySchema = mongoose.Schema({
    storeId: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
    },
    name: {
        type: String,
        trim: true,
    },
    slug: {
        type: String,
        trim: true,
    }

});

module.exports = mongoose.model('Category', categorySchema);