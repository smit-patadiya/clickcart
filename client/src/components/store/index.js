import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import axios from 'axios';

import AdminSidebar from '../common/AdminSidebar';


class Store extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: props.auth.user._id,
            storeId: '',
            name: '',
            submitting: false,
            errors: props.errors,
        };
    }

    componentWillMount(){
        let userId = this.state.userId;
        axios.get(`/api/store/byuser/${userId}`)
            .then( result => {

                if( result.data !== null ){
                    this.setState({
                        name: result.data.name,
                        storeId: result.data._id,
                    });
                }
                
            } )
            .catch( err => {
                console.log(err);
            } );

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
            name: this.state.name,
            userId: this.state.userId,
            storeId: this.state.storeId,
        }


        axios.post('/api/store/create', formDate)
            .then( result => {

                if(result.data){
                    this.setState({
                        name: result.data.name,
                        storeId: result.data.storeId,
                        submitting: false,
                    });
                }

            } )
            .catch( err => {
                console.log(err);
            } )

    }

    render() {
        
        const { errors } = this.state;

        let storeUrl = ( this.state.storeId !== '' ) ? `${window.location.origin}/render/${this.state.storeId}` : '...Loading...';

        return (
            <div className='p-2'>
                <h3 className=''>Create or Manage Store</h3>
                <form className='' onSubmit={this.onSubmit} >
                    <div className='form-group'>
                        <label htmlFor='name'>Store Name</label>
                        <input type='text' className='form-control' name='name' value={this.state.name} onChange={this.onChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='link'>Link</label>
                        <input type='text' className='form-control' value={ storeUrl } readOnly />
                    </div>
                    <div className='form-group'>
                        <button type="submit" className='btn btn-primary' disabled={this.state.submitting} >Submit</button>
                    </div>
                </form>
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