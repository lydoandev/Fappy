import { put, takeLatest } from "redux-saga/effects";
import store from "../store";
import database from '@react-native-firebase/database'
import * as Types from './actions'

function* fetchOrderSaga() {
  try {
    const { storeId } = store.getState().userReducer.users
    console.log("function*fetchOrderSaga -> id", storeId)
    const orders = yield database()
      .ref(`/orders`)
      .orderByChild("seller/id")
      .equalTo(storeId)
      .once("value")
      .then(snapshot => {
        console.log(".then -> snapshot", snapshot)
        if (snapshot.hasChildren()) {
          let orders = Object.values(snapshot.val())
          return orders;
        } else {
          return []
        }
      })
    yield put({ type: Types.FETCH_ORDERS_SUCCEEDED, payload: orders })

  } catch (error) {

  }
}

export function* watchOrderSaga() {
  yield takeLatest(Types.FETCH_ORDERS_REQUEST, fetchOrderSaga)
}