import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import axios from 'axios';

import Navbar from './Navbar';
import Products from './Products';



class Cart extends Component {

    constructor(props) {
        super(props);

        let storeId = this.props.match.params.storeid;
      
        this.state = {
            store: {
                storeId: storeId,
                storeUrl: `/#/render/${storeId}`,
            },
            cart: [],
            loading: true,
            message: '',
            msgSuccess: '',
        }


    }

    componentWillMount() {
        this.fetchCart();
    }

    fetchCart = () => {
        let userId = this.props.auth.user._id;
        let storeId = this.props.auth.user.storeId;


        axios.get(`/api/product/fetch-cart/${storeId}/${userId}`)
            .then(res => {

                this.setState({
                    loading: false,
                    cart: res.data
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


    render() {
        console.log(this.props);

        return (
            <div className=''>

                <Navbar data={this.state.store} />
                <div className='mt-3 mb-3'>
                    {this.state.loading && (
                        <div className='p-5 text-center'>
                            <i className="fas fa-spinner" />
                        </div>
                    )}
                    {!this.state.loading && (
                        <div className='container'>
                            <div className='m-3 ml-0'>
                                <Link to={this.state.store.storeUrl} className=''><i className="fas fa-home" /> Home</Link>
                            </div>
                            
                            <h4>Cart</h4>
                            { (this.state.cart.length > 0) && (
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Product</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Qty</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { this.state.cart.map( (item, index) => (
                                        <tr key={item._id}>
                                            <th scope="row">{index+1}</th>
                                            <td>{item.productId.name}</td>
                                            <td>{item.productId.price}</td>
                                            <td>1</td>
                                        </tr>
                                    ) ) }
                                        
                                        
                                    </tbody>
                                </table>

                            ) }
                            
                        </div>
                    )}

                </div>
            </div>
        );
    }
}
Cart.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps, {})(Cart); 