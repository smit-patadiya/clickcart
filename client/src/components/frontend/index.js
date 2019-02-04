import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import axios from 'axios';

class FrontEnd extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: props.auth.user._id,
            allCats: [],
            products: [],
            name: '',
            category: '',
            price: '',
            stock: '',
            detail: '',
            submitting: false,
        };
    }

    componentWillMount() {

      

    }

    fetchCats = () => {

        let storeId = this.props.store._id;
        axios.get(`/api/category/bystore/${storeId}`)
            .then(res => {
                this.setState({
                    allCats: res.data,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    fetchFrontEnd = () => {

        let storeId = this.props.store._id;
        axios.get(`/api/product/bystore/${storeId}`)
            .then(res => {
                this.setState({
                    products: res.data,
                })
            })
            .catch(err => {
                console.log(err);
            })
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

       

    }

    render() {

        return (
            <div className='p-2'>
               Hello
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