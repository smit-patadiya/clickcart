import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser, clearCurrentProfile } from './actions/authActions';

import PrivateRoute from './components/common/PrivateRoute';

import Home from "./components/Home";
import Navbar from "./components/common/Navbar";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import EditCat from './components/categories/edit';
import EditProduct from './components/products/edit';


import store from './store';
import FrontEnd from './components/frontend/index';


if( localStorage.ecartid ){

}


if ( localStorage.jwtToken ) {
	/**
	 * Set Auth token header Authorization, setAuthToken is define in utils/setAuthToken,
	 * which provides the auth token stored in local storage to the header of http request.
	 */
	setAuthToken( localStorage.jwtToken );

	// Decode the token( localStorage.jwtToken ) and get user info and exp
	const decoded = jwt_decode( localStorage.jwtToken );

	/**
	 * Set user and isAuthenticated values in the redux store, using setCurrentUser() defined in
	 * authActions.js, which takes the decoded value of the token.
	 */
	store.dispatch( setCurrentUser( decoded ) );

	/**
	 * Check if the token is expired
	 * decoded.exp contains the expiration timestamp of the token.
	 * So if the expiration time is less than the current time
	 * decoded.exp
	 * @type {number}
	 */
  const currentTime = Date.now() / 1000;

	if ( decoded.exp < currentTime ) {
		store.dispatch( logoutUser() );
		store.dispatch( clearCurrentProfile() );

		// Redirects the user to login page when the token is expired and the user logs out.
		window.location.href = '/';
	}
}


class App extends Component {
  render() {
		
    return (
      <Provider store={store}>
        <Router>
					<div className="App">

						<Route exact path="/render/:storeid" component={FrontEnd} />
						<Route exact path="/" component={Home} />
						<Route exact path="/register" component={Register} />
						<Switch><PrivateRoute exact path="/dashboard" component={Dashboard} /></Switch>
						<Switch><PrivateRoute exact path="/dashboard/:param" component={Dashboard} /></Switch>
						<Switch><PrivateRoute exact path="/edit-cat/:param" component={EditCat} /></Switch>
						<Switch><PrivateRoute exact path="/edit-product/:param" component={EditProduct} /></Switch>

					</div>
        </Router>
      </Provider>
    );
  }
}

export default App;
