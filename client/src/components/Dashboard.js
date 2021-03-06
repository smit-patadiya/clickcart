import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginUser } from "../actions/authActions";
import { fetchStore } from '../actions/storeActions';

import AdminSidebar from './common/AdminSidebar';
import Store from './store/index';
import Products from './products/index';
import Categories from './categories/index';
import Orders from './orders/index';
import EditCat from './categories/edit';
import Navbar from './common/Navbar';


class Dashboard extends Component {

    constructor( props ){
        super( props );

        this.state = {
            email: '',
            password: '',
            submitting: false,
            errors: props.errors,
        };

    }

    componentWillMount() {

        let userId = this.props.auth.user._id;
        this.props.fetchStore(userId);

    }

    componentWillReceiveProps( nextProps ){
        if( nextProps.errors ){
            this.setState( { errors: nextProps.errors } );
        }
    }

    onChange = ( event ) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = ( event ) => {
        event.preventDefault();

        this.setState({
            submitting: true,
        });

        const formDate = {
            email: this.state.email,
            password: this.state.password,
        }

        this.props.loginUser(formDate);

    }

    renderSwitch = ( param ) => {

        switch( param ){
            case 'store' : return <Store />;
            case 'products': return <Products />;
            case 'categories': return <Categories />;
            case 'orders': return <Orders />;

                
            default: return (<div>Not Found</div>)
        }
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const { errors } = this.state;

        const urlParams = (this.props.match.params.param) ? this.props.match.params.param : '';
        console.log(this);
        
        const returnComponent = '';


        return (
          <div className='container-fluid'>
                <Navbar />
             <div className="row">
              <div className='col-md-4 col-lg-3 col-xl-2 pl-0 pr-0'>
                <AdminSidebar />
              </div>
              <div className = 'col-md-8 col-lg-9 col-xl-10' >
                        {this.renderSwitch(urlParams)}
              </div>
            
            </div>
          </div>
        );
    }
}
 Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    fetchStore: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    store: state.store,
    errors: state.errors
});


export default connect(mapStateToProps, { loginUser, fetchStore })(Dashboard);