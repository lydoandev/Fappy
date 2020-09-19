import * as Type from "./action"
const initialState = {
  users: {},
  errs: [],
  isAuthenticated: false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {...state, users: action.payload};

    case 'LOGIN_SUCCESS':
      return {...state, users: action.payload, isAuthenticated: true};

    case 'LOGIN_FAILURE':
      return {...state, errs: action.payload};
    case 'REGISTER':
      return {...state, users: action.payload};

    case 'REGISTER_SUCCESS':
      return {...state, users: action.payload, isAuthenticated: true};

    case 'REGISTER_FAILURE':
      return {...state, errs: action.payload};
    case 'LOGOUT':
      return initialState;
    case Type.UPDATE_DEVICE_TOKEN_SUCCESSED:
      return Object.assign({}, state, {
        user: action.payload
      })
    default:
      return state;
  }
};
