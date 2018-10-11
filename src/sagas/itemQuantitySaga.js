import fetch from 'isomorphic-fetch';
import {put, select, takeLatest} from 'redux-saga/effects';

import {
    INCREASE_ITEM_QUANTITY,
    DECREASE_ITEM_QUANTITY,
    setItemQuantityFetchStatus,
    decreaseItemQuantity,
    FETCHED,
    FETCHING,
} from '../actions';
import {currentUserSelector} from '../selectors';

export function* handleIncreaseItemQuantity({id}) {
    yield put(setItemQuantityFetchStatus(FETCHING));
    const user = yield select(currentUserSelector);
    const response = yield fetch(`http://localhost:8081/cart/add/${user.get('id')}/${id}`);
    
    if (response.status !== 200) {
        yield put(decreaseItemQuantity(id, true));
        alert(`Sorry! There weren't enough items in stock to complete your request.`);
    }

    yield put(setItemQuantityFetchStatus(FETCHED));
}

export function* handleDecreaseItemQuantity({id, local}) {
    if (local) return;

    yield put(setItemQuantityFetchStatus(FETCHING));
    const user = yield select(currentUserSelector);
    yield fetch(`http://localhost:8081/cart/remove/${user.get('id')}/${id}`);
    yield put(setItemQuantityFetchStatus(FETCHED));
}

/** This Saga listens to increasing and decreasing quantity of product. */
export function* itemQuantitySaga() {
    yield [
        takeLatest(DECREASE_ITEM_QUANTITY, handleDecreaseItemQuantity),
        takeLatest(INCREASE_ITEM_QUANTITY, handleIncreaseItemQuantity),
    ];
}
