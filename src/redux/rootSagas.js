import {all} from 'redux-saga/effects';
import userSaga from './userRedux/saga';

function* rootSagas() {
  yield all([userSaga()]);
}

export default rootSagas;
