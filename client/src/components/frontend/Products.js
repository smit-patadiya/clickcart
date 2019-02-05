import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import axios from 'axios';

class Products extends Component {

    constructor(props) {
        super(props);

        this.state = {
            store: {
                storeId: this.props.data.storeId,
                homeUrl: this.props.data.storeUrl,
            },
            allCats: [],
            products: [],
        }

    }

    componentWillMount() {
        this.fetchFrontEnd();
        this.fetchCats();
    }

    fetchCats = () => {

        let storeId = this.state.store.storeId;
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

        let storeId = this.state.store.storeId;
        axios.get(`/api/product/bystorewithcat/${storeId}`)
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

    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();

    }

    render() {

        return (
            <div className='container'>
                <h4 className='text-center mt-3'>Products</h4>
                { (this.state.products.length > 0) && (
                    <div className='row'>
                        { this.state.products.map( (item, index) => (
                            <div className='col-12 col-sm-6 col-md-4 col-lg-3 text-center mb-5' key={item._id}>
                                
                                <div className="card">
                                    <div className='w-100 p-5 bg-light'>
                                        <i className="fas fa-dharmachakra" />
                                    </div>
                                    <div className="card-body">
                                            <h5 className=''>{item.name}</h5>
                                            <div>
                                                <small>{item.category.name}</small>
                                            </div>
                                            <div>
                                                <p >$ {item.price}</p>
                                            </div>
                                            <div>
                                            <Link className="btn btn-primary" to={`${this.state.store.homeUrl}/product/${item._id}`} role="button">View</Link>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        ) ) }
                    </div>
                ) }

            </div>
        );
    }
}
Products.propTypes = {
    
};

const mapStateToProps = (state) => ({
    
});


export default connect(mapStateToProps, {})(Products); 