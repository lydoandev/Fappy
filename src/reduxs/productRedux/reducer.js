import * as actions from "./actions"

const initState = {
  data: {},
  loading: false,
  cart: {
    items: []
  }
}


export const productReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.FETCH_HOME:
      return Object.assign({}, state, {
        loading: true
      });
    case actions.FETCH_CART_SUCCESSED:
      console.log("Payload: ", action.payload);

      return Object.assign({}, state, {
        loading: false,
        cart: action.payload
      });
    default: return state
  }
}