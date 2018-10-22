import fetch from 'isomorphic-fetch';
import {actionChannel, put, take} from 'redux-saga/effects';

import {
    FETCHED,
    SET_SHIPPING_FETCH_STATUS,
    setCanCheckOut
} from '../actions';

/**
 * - Prevent user from multiple clicks on chekout button.
 * - Button becomes enabled after FETCHED status fired only.
 */
export function* checkoutAvailabilitySaga() {
    const checkoutAvailabilityChannel = yield actionChannel(SET_SHIPPING_FETCH_STATUS);
    while (true) {
        const {status} = yield take(checkoutAvailabilityChannel);
        yield put(setCanCheckOut(status === FETCHED));
    }
}
