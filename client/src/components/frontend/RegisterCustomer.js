import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import axios from 'axios';

import Navbar from './Navbar';
import Products from './Products';



class RegisterCustomer extends Component {

    constructor(props) {
        super(props);

        let storeId = this.props.match.params.storeid;
        let productId = this.props.match.params.productId;


        this.state = {
            store: {
                storeId: storeId,
                storeUrl: `/#/render/${storeId}`,
            },
            email: '',
            password: '',
            submitting: false,
            errors: []
        }


    }

    componentWillMount() {
        
    }

    componentWillReceiveProps(nextProps) {

    }

    addToCart = () => {

    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();

        const formDate = {
            email: this.state.email,
            password: this.state.password,
            storeId: this.state.store.storeId,
        }

        axios.post('/api/customer/register', formDate)
            .then((res) => {
                console.log( res.data )
                let data = res.data;

                if (data.success ){
                    window.history.pushState( this.state.store.storeUrl )
                }else{

                    this.setState({
                        errors: res.data
                    });

                }
            })
            .catch((err) => {
                console.log(err);
            });

    }

    render() {
        const { isAuthenticated } = this.props.auth;

        if (isAuthenticated) {
            return;
        }

        const { errors } = this.state;

        return (
            <div className=''>

                <Navbar data={this.state.store} />
                <div className='container'>
                    <form className="mt-1 mb-2" onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <h4 className="text-center">Register</h4>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" name="email" value={this.state.email} onChange={this.onChange}
                                className={classnames('form-control', {
                                    'is-invalid': errors.email
                                })}
                                id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                            {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={this.state.password} onChange={this.onChange}
                                className={classnames('form-control', {
                                    'is-invalid': errors.password
                                })}
                                id="password" placeholder="Password" />
                            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}
RegisterCustomer.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});


export default connect(mapStateToProps, {})(RegisterCustomer); 