const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require("moment");
const SALT_I = 10;
require('dotenv').config();

const customerSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1,
        sparse: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    storeId: {
        type: String,
        required: true,
    }
});

customerSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(SALT_I, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        })
    } else {
        next()
    }
})

customerSchema.methods.comparePassword = (candidatePassword, dbPassword, cb) => {

    bcrypt.compare(candidatePassword, dbPassword, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

customerSchema.methods.generateToken = function (cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), process.env.SECRET)

    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user);
    })
}

module.exports = Customer = mongoose.model('Customer', customerSchema);