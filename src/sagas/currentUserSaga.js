import {delay} from 'redux-saga';

export function* currentUserSaga() {
    while(true) {
        yield delay(1000);
        console.log('Bang');
    }
}
