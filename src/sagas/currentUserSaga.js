import fetch from 'isomorphic-fetch';
import {apply, call, put, take} from 'redux-saga/effects';

import {
    GET_CURRENT_USER_INFO,
    setCurrentUser,
} from '../actions';

export function* currentUserSaga() {
    /**
     * - Saga waits for GET_CURRENT_USER_INFO action with `take`.
     * - Current user info will be fetched only once.
     * - Update current user status to call API.
     * - Use saga to `put` action containing returned information to the app.
     */
    const {id} = yield take(GET_CURRENT_USER_INFO);
    const response = yield call(fetch, `http://localhost:8081/user/${id}`);
    const data = yield apply(response, response.json);
    yield put(setCurrentUser(data));
}
