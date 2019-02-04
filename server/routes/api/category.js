var rfr = require('rfr');
const express = require('express');
const bcrypt = require('bcryptjs');
const secretKey = rfr('server/config/keys').secretOrKey;
const jwt = require('jsonwebtoken');
const passport = require('passport');


// Load model.
const Store = rfr('server/models/Store');
const Product = rfr('server/models/Product');
const Category = rfr('server/models/Category');




/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
 */
const router = express.Router();



router.get('/', (req, res) => {
    res.status(200).json({ success: true });
});

router.get('/:storeId', (req, res) => {

    Category.find({ storeId: req.params.storeId })
        .then( categories => {
            return res.status(200).json(categories);
        })
        .catch(err => {
            return res.status(400).json(err);
        });

});

router.post('/create', (req, res) => {

    let body = req.body,
        errors = {};

    let newCategory = new Category({
        storeId: body.storeId,
        name: body.name,
        slug: body.slug,
    });

    newCategory.save()
        .then( category => { return res.status(200).json(category) } )
        .catch( err => { return res.status(400).json(err) } );

    
} );

router.post('/edit', (req, res) => {

    let body = req.body,
        errors = {};

    var filter = { storeId: body.storeId, _id: body._id };
    var fieldQuery = {
        $set: { name: body.name, slug: body.slug }
    };

    Category.findOneAndUpdate( filter, fieldQuery )
        .then(category => { return res.status(200).json(category) })
        .catch(err => { return res.status(400).json(err) });


});




// We export the router so that the server.js file can pick it up
module.exports = router;