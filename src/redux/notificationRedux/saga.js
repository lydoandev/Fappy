import { put, takeLatest } from "redux-saga/effects";
import store from "../store";
import database from '@react-native-firebase/database'
import * as Types from './actions'

function* fetchNotificationSaga() {
  try {
    const { storeId } = store.getState().userReducer.users;
    console.log('Vào đây', storeId);
    
    const notifications = yield database()
      .ref(`/notifications`)
      .orderByChild("userId")
      .equalTo(storeId)
      .once("value")
      .then(snapshot => {
        console.log('Voo get noti');
        
        if (snapshot.hasChildren()) {
          let notifications = Object.values(snapshot.val())
          return notifications;
        } else {
          return []
        }
      })
    yield put({ type: Types.FETCH_NOTIFICATIONS_SUCCEEDED, payload: notifications })

  } catch (error) {

  }
}

export function* watchNotificationSaga() {
  yield takeLatest(Types.FETCH_NOTIFICATIONS_REQUEST, fetchNotificationSaga)
}