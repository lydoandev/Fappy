import {put, takeLatest} from 'redux-saga/effects';
import {AsyncStorage} from 'react-native';
import bottomTabs from '../../screens/Navigations';

import store  from '../store'
import * as actions from './action'
import database from '@react-native-firebase/database'

export function* updateDeviceToken(action) {
  console.log('Saga user: ', user);

    try {
      const { deviceToken }  = store.getState().appReducer;
      var user = store.getState().userReducer.users;
      if(deviceToken && Object.keys(user).length > 0 && user?.deviceToken != deviceToken) {
        user = {
          ...user,
          deviceToken
        }
        
        yield database().ref('users').child(user.id).update(user);
      }
     
      
      yield put({ type: "UPDATE_DEVICE_TOKEN_SUCCESSED", payload: user });
  
    } catch (error) {
      console.log('Error: ', error);
    }
}

function* login(action) {
  console.log('Hello');
  
  try {
    yield put({type: 'LOGIN_SUCCESS', payload: action.payload});
    yield AsyncStorage.setItem('latestUser', action.payload.token);
    console.log('Token in Saga =>', action.payload.token);
    bottomTabs();
  } catch (e) {
    yield put({type: 'LOGIN_FAILURE', payload: e.response.data.message});
  }
}
function* logout() {
  const value = AsyncStorage.getItem('Token');
  console.log('token=>', value);
}

function* register(action) {
  try {
    yield put({type: 'REGISTER_SUCCESS', payload: action.payload});
    bottomTabs(data.data);
  } catch (e) {
    console.log('err: ', e.response.data.message);
    yield put({type: 'REGISTER_FAILURE', payload: e.response.data.message});
  }
}

function* userSaga() {
  yield takeLatest('LOGIN', login);
  yield takeLatest('LOGOUT', logout);
  yield takeLatest('REGISTER', register);
  yield takeLatest('UPDATE_DEVICE_TOKEN', updateDeviceToken)
}
export default userSaga;
