import { combineReducers } from 'redux';
import auth from './auth';
import errors from './errors';
import store from './store';

export default combineReducers({
    auth: auth,
    errors: errors,
    store: store
});