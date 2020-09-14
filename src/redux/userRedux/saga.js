import {put, takeLatest} from 'redux-saga/effects';
import {AsyncStorage} from 'react-native';
import bottomTabs from '../../screens/Navigations';

import { store }  from '../store'

export function* updateDeviceToken(action) {
    try {
      const { deviceToken }  = store.getState().appReducer;
      var user = store.getState().users.users;
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
    takeLatest('UPDATE_DEVICE_TOKEN', updateDeviceToken)
]

function* login(action) {
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
  console.log('Action: ', action);
  try {
    console.log('Data: ', data.data);
    yield put({type: 'REGISTER_SUCCESS', payload: data.data});
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
}
export default userSaga;
