import * as Type from "./actions"

const initState = {
  orders: []
}

export const orderReducer = (state = initState, action) => {
    switch (action.type) {
      case Type.FETCH_ORDERS_SUCCEEDED:
        return {
          ...state,
          orders: action.payload
        }
      default: return state
    }
  }