const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require("moment");
const SALT_I = 10;
require('dotenv').config();

const cartSchema = mongoose.Schema({
    storeId: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
    }

});

module.exports = mongoose.model('Cart', cartSchema);