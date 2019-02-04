const rfr = require('rfr');
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const path = require( 'path' );
const passport = require('passport');

const mongoose = rfr('server/mongoose');

const user = rfr('server/routes/api/user');
const store = rfr('server/routes/api/store');
const product = rfr('server/routes/api/product');
const category = rfr('server/routes/api/category');

const router = express.Router();

const app = express();

/**
 * Configure the middleware.
 * bodyParser.json() returns a function that is passed as a param to app.use() as middleware
 * With the help of this method, we can now send JSON to our express application.
 */
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );

app.use('/api/user', user);
app.use('/api/store', store);
app.use('/api/product', product);
app.use('/api/category', category);

// Passport middleware
app.use(passport.initialize());



// Include Passport Config
rfr('server/config/passport')(passport);

// We export the router so that the server.js file can pick it up
module.exports = router;

// Combine react and node js servers while deploying( YOU MIGHT HAVE ALREADY DONE THIS BEFORE
// What you need to do is make the build directory on the heroku, which will contain the index.html of your react app and then point the HTTP request to the client/build directory

if ( process.env.NODE_ENV === 'production' ) {
	// Set a static folder
	app.use( express.static( 'client/build' ) );
	app.get( '*', ( req, res ) => res.sendFile( path.resolve( __dirname, 'client', 'build', 'index.html' ) ) );

}

// Set up a port
const port = process.env.PORT || 5000;

app.listen( port, () => console.log( `Server running on port: ${port}` ) );