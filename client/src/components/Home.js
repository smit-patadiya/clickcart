import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { logoutUser } from "../actions/authActions";
import Login from './Login';
import Dashboard from './Dashboard';
import Navbar from './common/Navbar';

class Home extends Component {

	render() {
		const { isAuthenticated, user } = this.props.auth;
		
		return(
			<div className={ classnames( '', { 'container': !isAuthenticated, 'container-fluid': isAuthenticated } ) }>
				<Navbar />
				{ !isAuthenticated && (
					<Login />
				) }
				{ isAuthenticated && (
					<Link to='/dashboard' className="btn">Dashboard</Link>
				) }
			</div>
		);
	}
}

Home.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});


export default connect(mapStateToProps, { logoutUser })(Home);