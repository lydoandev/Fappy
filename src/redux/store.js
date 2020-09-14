import {combineReducers, createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {userReducer} from './userRedux/reducer';
import {appReducer} from './appRedux/reducer'

import rootSagas from './rootSagas';
import {createLogger} from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({users: userReducer, appReducer: appReducer}),
  applyMiddleware(sagaMiddleware, createLogger()),
);

sagaMiddleware.run(rootSagas);
export default store;
