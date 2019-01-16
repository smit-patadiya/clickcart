import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';

import AdminSidebar from '../common/AdminSidebar';


class Store extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            submitting: false,
            errors: props.errors,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();

        this.setState({
            submitting: true,
        });

        const formDate = {
            email: this.state.email,
            password: this.state.password,
        }

        this.props.loginUser(formDate);

    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const { errors } = this.state;

        return (
            <div className=''>
                Store
            </div>
        );
    }
}
Store.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps)(Store); 