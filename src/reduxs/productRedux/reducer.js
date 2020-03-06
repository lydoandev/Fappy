import * as actions from "./actions"

const initState = {
  data: {},
  loading: false,
}


export const productReducer = (state = initState, action) => {
  switch (action.actions) {
    case actions.FETCH_HOME:
      return Object.assign({}, state, {
        loading: true
      });
    case actions.FETCH_HOME_SUCCESSED:
      return Object.assign({}, state, {
        loading: false,
        data: action.payload.data
      });
    default: return state
  }
}