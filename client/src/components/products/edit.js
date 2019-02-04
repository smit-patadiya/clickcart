import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import axios from 'axios';
import { fetchStore } from '../../actions/storeActions';

import AdminSidebar from '../common/AdminSidebar';


class EditProduct extends Component {

    constructor(props) {
        super(props);

        let proId = this.props.match.params.param;

        this.state = {
            _id: proId,
            allCats: [],
            name: '',
            category: '',
            price: '',
            stock: '',
            detail: '',
            submitting: false,
            storeId: '',
        };
    }

    componentWillMount() {
            
        this.fetchCats();

        axios.get(`/api/product/fetch-by-id/${this.state._id}`)
            .then(res => {

                this.setState({
                    name: res.data.name,
                    category: res.data.category,
                    price: res.data.price,
                    stock: res.data.stock,
                    image: res.data.image,
                    detail: res.data.detail,
                    storeId: res.data.storeId
                })
            })
            .catch(err => {
                console.log(err);
            });
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

        let storeId = this.state.storeId;

        let formData = {
            storeId: storeId,
            name: this.state.name,
            category: this.state.category,
            price: this.state.price,
            stock: this.state.stock,
            image: '',
            detail: this.state.detail,
        }

        axios.post(`/api/product/edit`, formData)
            .then( res => {

                this.setState({
                    name: res.data.name,
                    category: res.data.category,
                    price: res.data.price,
                    stock: res.data.stock,
                    image: res.data.image,
                    detail: res.data.detail,
                    submitting: false
                });

            } )
            .catch( err => {
                console.log(err);
                this.setState({
                    submitting: false
                });

            } );

    }

    render() {

        const { errors } = this.state;

        //console.log( this.state );


        return (
            <div className='container'>
                
                <form className="mt-1 mb-2" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <h4 className="text-center">Edit Product</h4>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input type="text" name="name" value={this.state.name} onChange={this.onChange}
                            className='form-control'
                            id="name" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Product Category</label>
                        <select name='category' value={this.state.category} className='form-control' onChange={this.onChange}>
                            {(this.state.allCats.length > 0) && this.state.allCats.map(item => (
                                <option value={item._id} key={item._id}>{item.name}</option>
                            ))}
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
                
            </div>
        );
    }
}
EditProduct.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    store: state.store,
    errors: state.errors
});


export default connect(mapStateToProps, { fetchStore })(EditProduct); 