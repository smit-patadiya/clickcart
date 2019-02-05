var rfr = require('rfr');
const express = require('express');
const bcrypt = require('bcryptjs');
const secretKey = rfr('server/config/keys').secretOrKey;
const jwt = require('jsonwebtoken');
const passport = require('passport');


// Load user model.
const User = rfr('server/models/User');
const Store = rfr('server/models/Store');


/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
 */
const router = express.Router();





router.get('/', (req, res) => {
    res.status(200).json({ success: true });
});


router.post('/register', ( req, res ) => {

    let body = req.body,
        errors = {};
    
    User.findOne( { email: body.email } )
        .then( existingUser => {
            if( existingUser ){
                errors.email = 'Email Already Exsists';
                return res.status(400).json( errors );
            }

            let newUser = new User({
                email: body.email,
                password: body.password,
            });

            newUser.save( (err, user) => {

                if (err) return res.status(400).json({ success: false, err });
                return res.status(200).json({
                    success: true
                })
            } );

        } )
        .catch( err => res.status(400).json(err) )


} );



// User Login
router.post( '/login', ( req, res ) => {

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }, ( err, user ) => {
         var errors = {};

        if( !user ){
           
            errors.email = 'Email Not Found';
            return res.status(400).json(  errors  );
        } 

        user.comparePassword(password, user.password , (err, isMatch) => {

            if ( !isMatch){
                errors.password = 'Wrong password';
                return res.status(400).json( errors );
            }

            Store.findOne({ userId: user._id })
                .then( store => {

                    payload = {
                        _id: user._id,
                        email: user.email
                    };

                    if( store ){
                        payload.storeId = store._id;
                    }else{
                        payload.storeId = '';
                    }

                    jwt.sign(payload, secretKey, { expiresIn: 86400 }, (err, token) => {
                        return res.json({ loginSuccess: true, token: 'Bearer ' + token });
                    });

                } );

        })

    } );

} );

// We export the router so that the server.js file can pick it up
module.exports = router;