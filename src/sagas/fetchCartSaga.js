import fetch from 'isomorphic-fetch';
import {take, put} from 'redux-saga/effects';

import {
    SET_CURRENT_USER,
    setCartItems,
} from '../actions';

/**
 * This Saga fetches list of items ID's in the user's cart.
 */
export function* fetchCartSaga() {
    const {user: {id}} = yield take(SET_CURRENT_USER);
    const response = yield fetch(`http://localhost:8081/cart/${id}`);
    const {items} = yield response.json();
    yield put(setCartItems(items));
}
