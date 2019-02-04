import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import axios from 'axios';

import AdminSidebar from '../common/AdminSidebar';


class Products extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: props.auth.user._id,
            
        };
    }

    componentWillMount() {

        let userId = this.state.userId;

        axios.get(`/api/store/byuser/${userId}`)
            .then(result => {

                if (result.data !== null) {
                    this.setState({
                        name: result.data.name,
                        storeId: result.data._id,
                    });
                }

            })
            .catch(err => {
                console.log(err);
            });

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

       

    }

    render() {

        const { errors } = this.state;

        let storeUrl = (this.state.storeId !== '') ? `${window.location.origin}/render/${this.state.storeId}` : '...Loading...';

        return (
            <div className='p-2'>
                <h3 className=''>Manage Products</h3>
                
            </div>
        );
    }
}
Products.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps)(Products); 