import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from "./components/Home";

import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>  
          <Route exact path="/" component={Home} />
        </Router>
      </Provider>
    );
  }
}

export default App;
