var rfr = require('rfr');
const express = require('express');
const bcrypt = require('bcryptjs');
const secretKey = rfr('server/config/keys').secretOrKey;
const jwt = require('jsonwebtoken');
const passport = require('passport');


// Load model.
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

router.get('/byuser/:userId', (req, res) => {

    Store.findOne({ userId: req.params.userId })
        .then(store => {
            
            return res.status(200).json(store);
        })
        .catch(err => {
            return res.status(400).json(err);
        });

});


router.post('/create', (req, res) => {

    let body = req.body,
        errors = {};

    Store.findOne({ userId: body.userId })
        .then(existingStore => {

            if ( ! existingStore ) {

                let newStore = new Store({
                    name: body.name,
                    userId: body.userId,
                });

                newStore.save((err, store) => {

                    if (err) return res.status(400).json({ success: false, err });
                    return res.status(200).json({
                        success: true,
                        store
                    })
                });
            }else{

                var filter = { userId: body.userId };
                var fieldQuery = {
                    $set: { name: req.body.name }
                };
                Store.findOneAndUpdate(filter, fieldQuery)
                    .then( store => {
                        return res.status(200).json(store);
                    } )
                    .catch(store => {
                        return res.status(200).json(store);
                    })
                    ;
            }

            

        })
        .catch(err => res.status(400).json(err))


});



// We export the router so that the server.js file can pick it up
module.exports = router;