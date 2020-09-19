import {combineReducers, createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {userReducer} from './userRedux/reducer';
import {appReducer} from './appRedux/reducer'
import {orderReducer} from './orderRedux/reducer'
import {productReducer} from './productRedux/reducer'
import { notificationReducer } from './notificationRedux/reducer'

import rootSagas from './rootSagas';
import {createLogger} from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({userReducer, appReducer, ordering: orderReducer, productReducer, notificationReducer}),
  applyMiddleware(sagaMiddleware, createLogger()),
);

sagaMiddleware.run(rootSagas);
export default store;
