import fetch from 'isomorphic-fetch';
import {fork, put, take} from 'redux-saga/effects';

import {
    SET_CART_ITEMS,
    setItemDetails,
} from '../actions';

/**
 * Fetches item details by ID.
 */
export function* loadItemDetails(id) {
    const response = yield fetch(`http://localhost:8081/items/${id}`);
    const data = yield response.json();
    yield put(setItemDetails(data[0]));
}

/**
 * This Saga forks process for each item in ID's list. And calls `loadItemDetails`
 * function that fetches item details by ID.
 */
export function* itemDetailsSaga() {
    const {items} = yield take(SET_CART_ITEMS);
    yield items.map(({id}) => fork(loadItemDetails, id));
}
