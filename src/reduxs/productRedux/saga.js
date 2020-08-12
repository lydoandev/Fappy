
import { put, takeLatest, call } from 'redux-saga/effects';
import * as actions from './actions';
import firebase from 'react-native-firebase'
import { store } from '../store'

export function* fetchData() {
  var products = [];
  var restaurants = [];
  var marketers = [];
  var orders = [];
  try {
    yield firebase.database().ref('restaurants')
      .on('child_added', snapshot => {
        restaurants.push({...snapshot.val(), id: snapshot.key})
      })

      yield firebase.database().ref('products')
      .on('child_added', snapshot => {
        products.push({...snapshot.val(), id: snapshot.key})
      })

      yield firebase.database().ref('marketers')
      .on('child_added', snapshot => {
        marketers.push({...snapshot.val(), id: snapshot.key})
      })
    yield put({ type: actions.FETCH_DATA_SUCCESS, payload: {restaurants, marketers, products}});

  } catch (error) {
    console.log('Error: ', error);
  }
}

export function* fetchCart(action) {

  try {
    var cart = yield firebase.database().ref('carts').orderByChild("userId")
      .equalTo(action.payload).once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          var id = Object.keys(snapshot.val());
          var { items, sellerId } = Object.values(snapshot.val())[0];
          return { id, items, sellerId }
        } else return {}
      })

    yield put({ type: actions.FETCH_CART_SUCCESSED, payload: cart });

  } catch (error) {
    console.log('Error: ', error);
  }
}

export function* fetchOrder(action) {
  try {
    const { user } = store.getState().authReducer;
    var orders = yield firebase.database().ref('orders').orderByChild("buyer/id")
      .equalTo(user.id).once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          return {order: snapshot.val(), key: Object.keys(snapshot.val())};
        } else return {}
      })

      var result = [];

      orders.key?.map(item => {
        result.push({
          id: item,
          ...orders.order[item]
        })
      })

    yield put({ type: actions.FETCH_ORDER_SUCCESSED, payload: result });

  } catch (error) {
    console.log('Error: ', error);
  }
}

export function* fetchNotification(action) {
  try {
    var notifications = yield firebase.database().ref('notifications').orderByChild("userId")
      .equalTo(action.payload).once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          return { notifications: snapshot.val(), key: Object.keys(snapshot.val()) };
        } else return {}
      })

      var result = [];

      notifications.key?.map(item => {
        result.push({
          ...notifications.notifications[item]
        })
      })
    yield put({ type: actions.FETCH_NOTIFICATION_SUCCESSED, payload: result });

  } catch (error) {
    console.log('Error: ', error);
  }
}

export const watchProductSaga = [
  takeLatest(actions.FETCH_CART, fetchCart),
  takeLatest(actions.FETCH_DATA, fetchData),
  takeLatest(actions.FETCH_ORDER, fetchOrder),
  takeLatest(actions.FETCH_NOTIFICATION, fetchNotification)
]