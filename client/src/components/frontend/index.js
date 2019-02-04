import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import axios from 'axios';

class FrontEnd extends Component {

    constructor(props) {
        super(props);

        let storeId = this.props.match.params.storeid;
        
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
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <a className="navbar-brand" href="#">Navbar</a>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#">Disabled</a>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>

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