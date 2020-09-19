import * as Type from "./actions"

const initState = {
  notifications: []
}

export const notificationReducer = (state = initState, action) => {
    switch (action.type) {
      case Type.FETCH_NOTIFICATIONS_SUCCEEDED:
        return {
          ...state,
          notifications: action.payload
        }
      default: return state
    }
  }