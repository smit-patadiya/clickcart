import { SET_CURRENT_PRODUCT_CATS, CLEAR_CURRENT_PRODUCT_CATS } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {

};

export default function (state = initialState, action) {
	/**
	 * If action.payload is filled with the user, that mean we should be authenticated.
	 * So the value of isAuthenticated will be true is action.payload has the value, false otherwise.
	 * isEmpty() is our custom function defined in validation/isEmpty.js
	 */
    switch (action.type) {
        case SET_CURRENT_PRODUCT_CATS:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_CURRENT_PRODUCT_CATS:
            return {
                ...state,
            }
        default: return state;
    }
}