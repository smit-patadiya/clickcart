import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import axios from 'axios';
import { fetchStore } from '../../actions/storeActions';

import AdminSidebar from '../common/AdminSidebar';


class Orders extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: props.auth.user._id,
            orders: [],
            loading: false,
        };
    }

    componentWillMount() {

        this.fetchOrders();

    }

    fetchOrders = () => {

        let storeId = this.props.auth.user.storeId;

        axios.get(`/api/product/fetch-orders/${storeId}`)
            .then(res => {
                this.setState({
                    orders: res.data,
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
            name: this.state.newName,
            slug: this.state.newSlug,
        }

        axios.post(`/api/category/create`, formData)
            .then(res => {

                this.fetchOrders();

                this.setState({
                    newName: '',
                    newSlug: '',
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
               
                <h3 className=''>Manage Orders</h3>

                {(this.state.orders.length > 0) && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product</th>
                                <th scope="col">Qty</th>
                                <th scope="col">Price</th>
                                <th scope="col">User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.orders.map((item, index) => (
                                <tr key={item._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.productId.name }</td>
                                    <td>1</td>
                                    <td>{item.productId.price}</td>
                                    <td>{item.userId.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                )}
            </div>
        );
    }
}
Orders.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    store: state.store,
    errors: state.errors
});


export default connect(mapStateToProps, { fetchStore })(Orders); 