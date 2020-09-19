import {all} from 'redux-saga/effects';
import { watchOrderSaga } from './orderRedux/saga';
import { watchProductSaga } from './productRedux/saga'
import { watchNotificationSaga } from './notificationRedux/saga'
import userSaga from './userRedux/saga';

function* rootSagas() {
  yield all([
    userSaga(),
    watchOrderSaga(),
    watchProductSaga(),
    watchNotificationSaga()
  ]);
}

export default rootSagas;
