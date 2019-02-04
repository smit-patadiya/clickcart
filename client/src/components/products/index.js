import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import axios from 'axios';
import { fetchStore } from '../../actions/storeActions';

import AdminSidebar from '../common/AdminSidebar';


class Products extends Component {

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
        
        this.fetchCats();
        this.fetchProducts();
       
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

    fetchProducts = () => {

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

        this.setState({
            submitting: true,
        });

        let storeId = this.props.store._id;

        let formData = {
            storeId: storeId,
            name: this.state.name,
            category: this.state.category,
            price: this.state.price,
            stock: this.state.stock,
            image: '',
            detail: this.state.detail,
        }

        axios.post(`/api/product/create`, formData)
            .then(res => {

                this.fetchProducts();
                
                this.setState({
                    name: '',
                    category: '',
                    price: '',
                    stock: '',
                    image: '',
                    detail: '',
                    submitting: false
                });


            })
            .catch(err => {
                console.log(err);
                this.setState({
                    submitting: false
                });

            });

    }

    render() {

        const { errors } = this.state;

        return (
            <div className='p-2'>
                <form className="mt-1 mb-2" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <h4 className="text-center">Add Product</h4>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input type="text" name="name" value={this.state.name} onChange={this.onChange}
                            className='form-control'
                            id="name"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Product Category</label>
                        <select name='category' value={this.state.category} className='form-control' onChange={this.onChange}>
                            { ( this.state.allCats.length > 0 ) && this.state.allCats.map( item => (
                                <option value={item._id} key={item._id}>{item.name}</option>
                            ) ) }
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Product Price</label>
                        <input type="text" name="price" value={this.state.price} onChange={this.onChange}
                            className='form-control'
                            id="price" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="stock">Product Stock</label>
                        <input type="text" name="stock" value={this.state.stock} onChange={this.onChange}
                            className='form-control'
                            id="stock" />
                    </div>


                    <div className="form-group">
                        <label htmlFor="detail">Product detail</label>
                        <textarea className="form-control" id="detail" rows={5} value={this.state.detail} name='detail' onChange={this.onChange} />
                    </div>
                    
                    <button type="submit" className="btn btn-primary" disabled={this.state.submitting} >Submit</button>
                </form>

                <hr />

                <h3 className=''>Manage Products</h3>
                
                { (this.state.products.length > 0) && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Category</th>
                                <th scope="col">Price</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.products.map( (item, index) => {

                                let catObj = {};

                                if ( this.state.allCats.length ){
                                    catObj = this.state.allCats.find(o => o._id === item.category);
                                }
                               
                                let cat = (catObj.name) ? catObj.name : item.category;
                                return (
                                <tr key={item._id}>
                                    <th scope="row">{ index + 1 }</th>
                                    <td>{item.name}</td>
                                    <td>{ cat }</td>
                                    <td>{item.price}</td>
                                    <td>{item.stock}</td>
                                    <td>
                                        <Link className="nav-link" to={`/edit-product/${item._id}`}>
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                             )} ) }           
                        </tbody>
                    </table>

                ) }
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
    store: state.store,
    errors: state.errors
});


export default connect(mapStateToProps, { fetchStore })(Products); 