import { combineReducers } from 'redux';

import { authReducer } from './authRedux/reducer'
import { productReducer } from './productRedux/reducer'

const reducers = combineReducers({
  authReducer,
  productReducer
});

export default reducers;