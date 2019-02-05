var rfr = require('rfr');
const express = require('express');
const bcrypt = require('bcryptjs');
const secretKey = rfr('server/config/keys').secretOrKey;
const jwt = require('jsonwebtoken');
const passport = require('passport');


// Load user model.
const Customer = rfr('server/models/Customer');
const Store = rfr('server/models/Store');


/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
 */
const router = express.Router();





router.get('/', (req, res) => {
    res.status(200).json({ success: true });
});


router.post('/register', (req, res) => {

    let body = req.body,
        errors = {};

    Customer.findOne({ email: body.email, storeId: body.storeId })
        .then(existingCustomer => {
            if (existingCustomer) {
                errors.email = 'Email Already Exsists';
                return res.status(200).json(errors);
            }

            let newCustomer = new Customer({
                email: body.email,
                password: body.password,
                storeId: body.storeId,
            });

            newCustomer.save((err, user) => {

                if (err) return res.status(400).json({ success: false, err });
                return res.status(200).json({
                    success: true
                })
            });

        })
        .catch(err => res.status(400).json(err))


});



// Customer Login
router.post('/login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const storeId = req.body.storeId;

    Customer.findOne({ email: email, storeId: storeId }, (err, user) => {
        var errors = {};

        if (!user) {

            errors.email = 'Email Not Found';
            return res.status(400).json(errors);
        }

        user.comparePassword(password, user.password, (err, isMatch) => {

            if ( !isMatch ) {
                errors.password = 'Wrong password';
                return res.status(400).json(errors);
            }


            payload = {
                _id: user._id,
                email: user.email,
                storeId: storeId
            };

            jwt.sign(payload, secretKey, { expiresIn: 86400 }, (err, token) => {
                return res.json( 'Bearer ' + token );
            });


        })

    });

});

// We export the router so that the server.js file can pick it up
module.exports = router;