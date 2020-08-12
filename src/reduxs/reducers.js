import { combineReducers } from 'redux';

import { authReducer } from './authRedux/reducer'
import { productReducer } from './productRedux/reducer'
import { appReducer } from './appRedux/reducer'

const reducers = combineReducers({
  authReducer,
  productReducer,
  appReducer
});

export default reducers;