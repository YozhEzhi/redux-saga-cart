import fetch from 'isomorphic-fetch';
import {all, call, fork, put, take} from 'redux-saga/effects';

import {
    SET_CART_ITEMS,
    SET_CURRENT_USER,
    setItemPrice,
} from '../actions';

export function* fetchItemPrice(id, currency) {
    const response = yield fetch(`http://localhost:8081/prices/${currency}/${id}`);
    const json = yield response.json();
    const {price} = json[0];
    yield put(setItemPrice(id, price));
}

/** This Saga listens to increasing and decreasing quantity of product. */
export function* itemPriceSaga() {
    const [{user: {country}}, {items}] = yield all([
        take(SET_CURRENT_USER),
        take(SET_CART_ITEMS),
    ]);

    yield items.map(({id}) => call(fetchItemPrice, id, country));
}
