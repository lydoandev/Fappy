
import { put, takeLatest, call } from 'redux-saga/effects';
import * as actions from './actions';
import firebase from 'react-native-firebase'

export function* fetchCart(action) {

  try {
    var cart = yield firebase.database().ref('carts').orderByChild("userId")
      .equalTo(action.payload).once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          var { items, sellerId } = Object.values(snapshot.val())[0];
          return { items, sellerId }
        } else return {}
      })
      
    yield put({ type: actions.FETCH_CART_SUCCESSED, payload: cart });


  } catch (error) {
    console.log('Error: ', error);
  }
}

export const watchProductSaga = [
  takeLatest(actions.FETCH_CART, fetchCart)
]