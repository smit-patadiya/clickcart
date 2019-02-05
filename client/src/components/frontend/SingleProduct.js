import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import axios from 'axios';

import Navbar from './Navbar';
import Products from './Products';



class SingleProduct extends Component {

    constructor(props) {
        super(props);

        let storeId = this.props.match.params.storeid;
        let productId = this.props.match.params.productId;


        this.state = {
            store: {
                storeId: storeId,
                storeUrl: `/#/render/${storeId}`,
            },
            productId: productId,
            name: '',
            price: '',
            stock: '',
            detail: '',
            category: {},
            loading: true,
            message: '',
            msgSuccess: '',
        }


    }

    componentWillMount() {
        this.fetchProduct();
    }

    fetchProduct = () => {
        
        axios.get(`/api/product/fetch-by-id-with-cat/${this.state.productId}`)
            .then(res => {

                this.setState({
                    name: res.data.name,
                    price: res.data.price,
                    stock: res.data.stock,
                    detail: res.data.detail,
                    category: res.data.category,
                    loading: false,

                })
            })
            .catch(err => {
                console.log(err);
            })
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

    }

    onAddToCart = () => {

       
        if (this.props.auth.isAuthenticated ){

            let formData = {
                userId: this.props.auth.user._id,
                storeId: this.props.auth.user.storeId,
                productId: this.state.productId
            }

            axios.post(`/api/product/add-to-cart`, formData)
                .then(result => {
                    this.setState({
                        msgSuccess: 'Product Added to cart'
                    })
                })
                .catch(err => {
                    console.log(err);
                });

        }else{
            this.setState({
                message: 'Please Login to add to cart'
            })
        }
        

       

    }

    render() {
        console.log(this.props);

        return (
            <div className=''>
                
                <Navbar data={this.state.store} />
                <div className='mt-3 mb-3'>
                    { this.state.loading && (
                        <div className='p-5 text-center'>
                            <i className="fas fa-spinner" />
                        </div>
                    ) }
                    { !this.state.loading && (
                        <div className='container'>
                            <div className='m-3 ml-0'>
                                <Link to={this.state.store.storeUrl} className=''><i className="fas fa-home" /> Home</Link>
                            </div>
                            <div className='row'>
                                <div className='col-12 col-sm-6 col-md-4'>
                                    <div className='card'>
                                        <div className='w-100 bg-light text-center' style={{ paddingTop: '100%' }}>
                                            
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className='col-12 col-sm-6 col-md-8'>
                                    <h3 className='mb-3'>{ this.state.name }</h3>
                                    <p className=''>
                                        <i className="fas fa-tag mr-2" />
                                        {this.state.category.name }
                                    </p>
                                    <p>
                                        Stock: {this.state.stock }
                                    </p>
                                    <p className='text-primary'>
                                        Price: $ {this.state.price}
                                    </p>

                                    <button type='button' className='btn btn-warning' onClick={this.onAddToCart}>Add To Cart</button>
                                    { this.state.message && (<div className='text-danger'>
                                        {this.state.message}
                                    </div>) }
                                    {this.state.msgSuccess && (<div className='text-success'>
                                        {this.state.msgSuccess}
                                    </div>)}

                                </div>
                            </div>
                            <div className='mb-2 mt-4'>
                               
                                {this.state.detail.split('\n').map((line, index) => {
                                    return (
                                        <span key={`offer-description-${index}`}>
                                            {line}
                                            <br />
                                        </span>
                                    )
                                })}
                            </div>
                        </div>
                    ) }

                </div>
            </div>
        );
    }
}
SingleProduct.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps, {})(SingleProduct); 