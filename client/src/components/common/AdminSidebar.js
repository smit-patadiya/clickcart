import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
//import { loginUser } from "../actions/authActions";

class AdminSidebar extends Component {

    constructor( props ){
        super( props );
    }

    componentWillReceiveProps( nextProps ){
       
    }


    render() {
        const { isAuthenticated, user } = this.props.auth;

        const urlRoot = '/dashboard';
        return (
            <nav className="bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link active" to={`${urlRoot}/store`}>
                            Store
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={`${urlRoot}/products`}>
                            Products
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={`${urlRoot}/categories`}>
                            Categories
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={`${urlRoot}/orders`}>
                            Orders
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={`${urlRoot}/customers`}>
                            Customers
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={`${urlRoot}/integration`}>
                            Integration
                        </Link>
                    </li>

                    </ul>

                    
                </div>
            </nav>
        );
    }
}
 AdminSidebar.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps)(AdminSidebar);