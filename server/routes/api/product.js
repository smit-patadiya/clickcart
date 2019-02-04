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

    Product.find({ storeId: req.params.storeId })
        .then(products => {
            return res.status(200).json(products);
        })
        .catch(err => {
            return res.status(400).json(err);
        });

});

router.post('/create', (req, res) => {

    let body = req.body,
        errors = {};

    let newProduct = new Product({
        storeId: body.storeId,
        name: body.name,
        category: body.category,
        price: body.price,
        stock: body.stock,
        image: '',
        detail: body.detail,
    });

    newProduct.save()
        .then(category => { return res.status(200).json(category) })
        .catch(err => { return res.status(400).json(err) });


});

router.post('/edit', (req, res) => {

    let body = req.body,
        errors = {};

    var filter = { storeId: body.storeId };
    var fieldQuery = {
        $set: {
            name: body.name,
            category: body.category,
            price: body.price,
            stock: body.stock,
            detail: body.detail,
        }
    };
    
    Product.findOneAndUpdate(filter, fieldQuery)
        .then(product => { return res.status(200).json(product) })
        .catch(err => { return res.status(400).json(err) });


});




// We export the router so that the server.js file can pick it up
module.exports = router;