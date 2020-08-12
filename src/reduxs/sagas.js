import { all } from 'redux-saga/effects';
import { watchUserSaga } from './authRedux/saga';
import { watchProductSaga } from './productRedux/saga'
import { watchAppSaga } from './appRedux/saga'

export default function* rootSaga() {
  yield all([...watchUserSaga, ...watchProductSaga, ...watchAppSaga]);
}