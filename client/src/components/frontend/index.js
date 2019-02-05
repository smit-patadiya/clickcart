import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import axios from 'axios';

import Navbar from './Navbar';
import Products from './Products';



class FrontEnd extends Component {

    constructor(props) {
        super(props);

        let storeId = this.props.match.params.storeid;
        
        this.state = {
            store: {
                storeId: storeId,
                storeUrl: `/render/${storeId}`,
            },
            allCats: [],
            products: [],
        }
    }

    componentWillMount() {
        
    }

    fetchCats = () => {

    }

    fetchFrontEnd = () => {

    }

    componentWillReceiveProps(nextProps) {
        
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();

    }

    render() {

        return (
            <div className=''>

                <Navbar data={this.state.store} />
                <Products data={this.state.store} />
            </div>
        );
    }
}
FrontEnd.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps, {  })(FrontEnd); 