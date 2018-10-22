import fetch from 'isomorphic-fetch';
import {put, select, takeLatest} from 'redux-saga/effects';

import {
    DECREASE_ITEM_QUANTITY,
    FETCHED,
    FETCHING,
    INCREASE_ITEM_QUANTITY,
    SET_CART_ITEMS,
    setShippingCost,
    setShippingFetchStatus,
} from '../actions';

import {cartItemsSelector} from '../selectors';

export function* shipping() {
    yield put(setShippingFetchStatus(FETCHING));
    const items = yield select(cartItemsSelector);

    const itemRequstString = items.reduce((string, item) => {
        for (let i = 0; i < item.get('quantity'); i++) {
            string += item.get('id') + ',';
        }
        return string;
    }, '').replace(/,\s*$/, '');

    const response = yield fetch(`http://localhost:8081/shipping/${itemRequstString}`);
    const {total} = yield response.json();
    yield put(setShippingCost(total));
    yield put(setShippingFetchStatus(FETCHED));
}

export function* shippingSaga() {
    yield takeLatest([
        DECREASE_ITEM_QUANTITY,
        SET_CART_ITEMS,
        INCREASE_ITEM_QUANTITY,
    ], shipping);
}
