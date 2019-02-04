import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import axios from 'axios';
import { fetchStore } from '../../actions/storeActions';

import AdminSidebar from '../common/AdminSidebar';


class Categories extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: props.auth.user._id,
            cats: [],
            newName: '',
            newSlug: '',
            submitting: false,
        };
    }

    componentWillMount() {
       
        this.fetchCats();
       
    }

    fetchCats = () => {

        let storeId = this.props.store._id;
        axios.get(`/api/category/bystore/${storeId}`)
            .then(res => {
                this.setState({
                    cats: res.data,
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

                this.fetchCats();
                
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
                <form className="mt-1 mb-2" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <h4 className="text-center">Add Category</h4>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Category Name</label>
                        <input type="text" name="newName" value={this.state.newName} onChange={this.onChange}
                            className='form-control'
                            id="newName"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="newSlug">Category Slug</label>
                        <input type="text" name="newSlug" value={this.state.newSlug} onChange={this.onChange}
                            className='form-control'
                            id="newSlug" />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={this.state.submitting} >Submit</button>
                </form>
                <hr />
                <h3 className=''>Manage Categories</h3>
                
                { (this.state.cats.length > 0) && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Category</th>
                                <th scope="col">Slug</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.cats.map( (item, index) => (
                                <tr key={item._id}>
                                    <th scope="row">{ index + 1 }</th>
                                    <td>{item.name}</td>
                                    <td>{item.slug}</td>
                                    <td>
                                        <Link className="nav-link" to={`/edit-cat/${item._id}`}>
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                             ) ) }           
                        </tbody>
                    </table>

                ) }
            </div>
        );
    }
}
Categories.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    store: state.store,
    errors: state.errors
});


export default connect(mapStateToProps, { fetchStore })(Categories); 