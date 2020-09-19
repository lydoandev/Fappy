import * as Type from "./actions"

const initState = {
  products: []
}

export const productReducer = (state = initState, action) => {
    switch (action.type) {
      case Type.FETCH_PRODUCT_SUCCEEDED:
        return {
          ...state,
          products: action.payload
        }
      default: return state
    }
  }