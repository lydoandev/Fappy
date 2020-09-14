import { takeLatest, put } from "redux-saga/effects";
import * as actions from './actions';
import database from '@react-native-firebase/database';
import { store }  from '../store'


export function* updateDeviceToken(action) {
    try {
      const { deviceToken }  = store.getState().appReducer;
      var user = store.getState().authReducer.user;
      if(deviceToken && Object.keys(user).length > 0 && user?.deviceToken != deviceToken) {
        user = {
          ...user,
          deviceToken
        }
        
        yield database().ref('users').child(user.id).update(user);
      }
      yield put({ type: actions.UPDATE_DEVICE_TOKEN_SUCCESSED, payload: user });
  
    } catch (error) {
      console.log('Error: ', error);
    }
}

export const watchUserSaga = [
    takeLatest(actions.UPDATE_DEVICE_TOKEN, updateDeviceToken)
]