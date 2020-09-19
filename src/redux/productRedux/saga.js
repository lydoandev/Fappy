import { put, takeLatest } from "redux-saga/effects";
import store from "../store";
import database from '@react-native-firebase/database'
import * as Types from './actions'

function* fetchProductSaga() {
  try {
    const { storeId } = store.getState().userReducer.users
    console.log("function*fetchOrderSaga -> id", storeId)
    const products = yield database()
      .ref(`/products`)
      .orderByChild("sellerId")
      .equalTo(storeId)
      .once("value")
      .then(snapshot => {
        console.log(".then -> snapshot", snapshot)
        if (snapshot.hasChildren()) {
          let products = Object.values(snapshot.val())
          return products;
        } else {
          return []
        }
      })
    yield put({ type: Types.FETCH_PRODUCT_SUCCEEDED, payload: products.filter(item => !item.deleted || item.deleted != true) })

  } catch (error) {

  }
}

export function* watchProductSaga() {
  yield takeLatest(Types.FETCH_PRODUCT_REQUEST, fetchProductSaga)
}