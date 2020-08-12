import * as Type from "./actions"

const initState = {
  deviceToken: '',
  isStarted: false
}

export const appReducer = (state = initState, action) => {
    switch (action.type) {
      case Type.GET_STARTED:
        return Object.assign({}, state, {
          isStarted: true
        });
      case Type.CHANGE_DEVICE_TOKEN:
        return Object.assign({}, state, {
            deviceToken: action.payload
        })
      default: return state
    }
  }