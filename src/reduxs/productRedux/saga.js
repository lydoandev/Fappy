
import { put, takeLatest, call } from 'redux-saga/effects';
import * as actions from './actions';
import fetchData from '../../until/fetchData'

export function* fetchHome() {
  try {
    var data = fetchData('products');
    yield put({ type: actions.FETCH_HOME_SUCCESSED, payload: data });
  } catch (error) {
    console.log('Error: ', error);
  }
}

export const watchProductSaga = [
  takeLatest(actions.FETCH_HOME, fetchHome)
]