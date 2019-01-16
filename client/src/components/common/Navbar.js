import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from "../../actions/authActions";


class Navbar extends Component {

    constructor( props ){
        super( props );

        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.logoutUser();
		//this.props.clearCurrentProfile();
    }

    render() {

        const { isAuthenticated, user } = this.props.auth;
       
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom border-top ">
                <Link className="navbar-brand" to="/"><i className="fas fa-biohazard"></i></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {
                            isAuthenticated && (
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                </li>
                            )
                        }
                        
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Link</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="#">Action</Link>
                                <Link className="dropdown-item" to="#">Another action</Link>
                                <div className="dropdown-divider" />
                                <Link className="dropdown-item" to="#">Something else here</Link>
                            </div>
                        </li>
                        {
                            isAuthenticated && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="#" onClick={ this.logout }>Logout</Link>
                                </li>
                            )
                        }
                        
                    </ul>
                    
                </div>
            </nav>


        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});


export default connect(mapStateToProps, { logoutUser })(Navbar);