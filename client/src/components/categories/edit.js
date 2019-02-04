import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import axios from 'axios';
import { fetchStore } from '../../actions/storeActions';

import AdminSidebar from '../common/AdminSidebar';


class EditCat extends Component {

    constructor(props) {
        super(props);

        let catId = this.props.match.params.param;

        this.state = {
            catId: catId,
            name: '',
            slug: '',
            submitting: false,
        };
    }

    componentWillMount() {
            

        axios.get(`/api/category/fetch-by-catid/${this.state.catId}`)
            .then(res => {
                this.setState({
                    name: res.data.name,
                    slug: res.data.slug,
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

        let formData = {
            _id: this.state.catId,
            name: this.state.name,
            slug: this.state.slug,
        }

        axios.post(`/api/category/edit`, formData)
            .then( res => {

                this.setState({
                    name: res.data.name,
                    slug: res.data.slug,
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

        return (
            <div className='container'>
                
                <form className="mt-1 mb-2" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <h4 className="text-center">Edit Category</h4>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Category Name</label>
                        <input type="text" name="name" value={this.state.name} onChange={this.onChange}
                            className='form-control'
                            id="name" aria-describedby="nameHelp" placeholder="Enter Category Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="slug">Category Slug</label>
                        <input type="text" name="slug" value={this.state.slug} onChange={this.onChange}
                            className='form-control'
                            id="slug" aria-describedby="slugHelp" placeholder="Enter Category Slug" />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={this.state.submitting} >Submit</button>
                </form>
                
            </div>
        );
    }
}
EditCat.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    store: state.store,
    errors: state.errors
});


export default connect(mapStateToProps, { fetchStore })(EditCat); 