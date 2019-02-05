const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require("moment");
const SALT_I = 10;
require('dotenv').config();

const productsSchema = mongoose.Schema({
    storeId: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
    },
    name: {
        type: String,
        trim: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
    },
    price: {
        type: Number,
    },
    stock: {
        type: Number,
    },
    image: {
        type: String,
    },
    detail: {
        type: String
    }

});

module.exports = mongoose.model('Product', productsSchema);