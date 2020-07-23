import * as actions from "./actions"

const initState = {
  data: {},
  loading: false,
  cart: {
    items: []
  },
  orders: [],
  notifications: []
}


export const productReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.FETCH_HOME:
      return Object.assign({}, state, {
        loading: true
      });
    case actions.FETCH_CART_SUCCESSED:

      return Object.assign({}, state, {
        loading: false,
        cart: action.payload
      });
    case actions.FETCH_DATA_SUCCESS:
      return Object.assign({}, state, {
        restaurants: action.payload.restaurants,
        products: action.payload.products,
        marketers: action.payload.marketers,
      });
    case actions.FETCH_ORDER_SUCCESSED:
      return Object.assign({}, state, {
        orders: action.payload,
      });
    case actions.FETCH_NOTIFICATION_SUCCESSED:
      return Object.assign({}, state, {
        notifications: action.payload,
      });
    default: return state
  }
}