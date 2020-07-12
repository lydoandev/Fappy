import * as Type from "./actions"

const initState = {
  data: {},
  loading: false,
  isAuthenticated: false,
  user: {},
  cart: [],
  idCart: '',
  notifications: [],
  token: ''
}


export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case Type.LOGIN_SUCCESSED:
      return Object.assign({}, state, {
        isAuthenticated: true,
        user: action.payload,
      });
    case Type.GET_CART_SUCCESSED:
      return Object.assign({}, state, {
        cart: action.payload
      });
    case Type.REGISTER:
      return Object.assign({}, state, {
        loading: true,
        signingUp: false,
        error: ''
      });
    case Type.LOGOUT:
      return Object.assign({}, state, {
        isAuthenticated: false,
        user: {},
        error: ''
      })
    case Type.UPDATE_DEVICE_TOKEN:
      return Object.assign({}, state, {
        token: action.payload
      })
    case Type.GET_NOTIFICATIONS:
      return Object.assign({}, state, {
        loading: true,
      })
    case Type.GET_NOTIFICATIONS_SUCCESSED:
      return Object.assign({}, state, {
        loading: false,
        notifications: action.payload
      })
    case Type.UPDATE_PROFILE_SUCCESSED:
      return Object.assign({}, state, {
        isAuthenticated: true,
        user: action.payload.Data,
        loading: false,
        error: '',
      });
    case Type.UPDATE_PROFILE_FAILED:
      return Object.assign({}, state, {
        loading: false,
        isAuthenticated: false,
        error: action.payload
      });
    default: return state
  }
}