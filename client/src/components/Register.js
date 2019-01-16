import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { registerUser } from "../actions/authActions";

class Register extends Component {

    constructor( props ){
        super( props );

        this.state = {
            email: '',
            password: '',
            submitting: false,
            errors: props.errors,
        };
    }

    componentWillReceiveProps( nextProps ){
        if( nextProps.errors ){
            this.setState( { errors: nextProps.errors } );
        }
    }

    onChange = ( event ) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = ( event ) => {
        event.preventDefault();

        this.setState({
            submitting: true,
        });

        const formDate = {
            email: this.state.email,
            password: this.state.password,
        }

        this.props.registerUser(formDate);

    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        if( isAuthenticated ){
            return;
        }

        const { errors } = this.state;

        return (
            <div>  
                <form className="mt-1 mb-2" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <h4 className="text-center">Register</h4>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" name="email" value={this.state.email} onChange={this.onChange} 
                            className={ classnames( 'form-control', {
												       'is-invalid': errors.email
											       } ) }
                        id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    { errors.email && ( <div className="invalid-feedback">{ errors.email }</div> ) }
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.onChange} 
                        className={ classnames( 'form-control', {
												       'is-invalid': errors.password
											       } ) }
                        id="password" placeholder="Password" />
                        { errors.password && ( <div className="invalid-feedback">{ errors.password }</div> ) }
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

			</div>
        );
    }
}

Register.propTypes = {
    auth: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps, { registerUser })(Register);