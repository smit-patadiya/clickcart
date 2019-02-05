import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            storeId: this.props.data.storeId,
            homeUrl: this.props.data.storeUrl,
        }

    }



    render() {

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <Link className="navbar-brand" to={this.state.homeUrl}>Store</Link>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <Link className="nav-link" to={this.state.homeUrl}>Home</Link>
                        </li>
                        
                    </ul>
                    
                </div>
            </nav>


        );
    }
}

Navbar.propTypes = {
    
};

const mapStateToProps = (state) => ({
   
});


export default connect(mapStateToProps, {  })(Navbar);