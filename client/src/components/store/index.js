import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import axios from 'axios';
import { fetchStore } from '../../actions/storeActions';
import { createStore } from '../../actions/storeActions';

import AdminSidebar from '../common/AdminSidebar';


class Store extends Component {

    constructor(props) {
        super(props);

        this.state = {

            userId: props.auth.user._id,
            submitting: false,
            errors: props.errors,
        };
    }

    componentWillMount(){

        let userId = this.state.userId;
        
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

        const formDate = {
            name: this.state.name,
            userId: this.state.userId,
            storeId: this.state.storeId,
        }


        this.props.createStore(formDate);

    }

    render() {
        
        const { errors } = this.state;

        let storeId = ( this.props.store._id ) ? this.props.store._id : '';
        let storename = (this.props.store.name) ? this.props.store.name : this.state.name;;
    
        
        let storeUrl = (this.state.storeId !== '') ? `${window.location.origin}/#/render/${storeId}` : '...Loading...';

        let textArea = ` <iframe id="form-iframe" src="${storeUrl}" style="margin:0; width:100%; height:150px; border:none; overflow:hidden;" scrolling="no" onload="AdjustIframeHeightOnLoad()"></iframe><script type="text/javascript">function AdjustIframeHeightOnLoad() { document.getElementById("form-iframe").style.height = document.getElementById("form-iframe").contentWindow.document.body.scrollHeight + "px"; }function AdjustIframeHeight(i) { document.getElementById("form-iframe").style.height = parseInt(i) + "px"; }</script>`;
        return (
            <div className='p-2'>
                <h3 className=''>Create or Manage Store</h3>
                <form className='' onSubmit={this.onSubmit} >
                    <div className='form-group'>
                        <label htmlFor='name'>Store Name</label>
                        <input type='text' className='form-control' name='name' value={this.state.name} onChange={this.onChange} />
                    </div>
                    
                        <div className='form-group'>
                            <label htmlFor='link'>Link</label>
                            {(storeId !== '') && (<textarea rows={5} className='form-control' readOnly={true} value={textArea}></textarea>)}
                            {( storeId === '' ) && (<div>Waiting...</div>) }
                        </div>

                    <Link to={`/render/${storeId}`}>Visit</Link>
                    
                    
                    <div className='form-group'>
                        <button type="submit" className='btn btn-primary' disabled={this.state.submitting} >Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}
Store.propTypes = {
    auth: PropTypes.object.isRequired,
    createStore: PropTypes.func.isRequired,
    fetchStore: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    store: state.store,
    errors: state.errors
});


export default connect(mapStateToProps, { createStore, fetchStore })(Store); 