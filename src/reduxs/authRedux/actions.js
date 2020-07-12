
export const LOGIN_SUCCESSED = "LOGIN_SUCCESSED"

export const LOGOUT = "LOGOUT"

export const UPDATE_DEVICE_TOKEN = "UPDATE_DEVICE_TOKEN"


export const loginSuccessed = (user) => {
  return { type: LOGIN_SUCCESSED, payload: user }
}

export const logout = () => {
  return { type: LOGOUT }
}

export const updateDeviceToken = (token) => {
  return { type: UPDATE_DEVICE_TOKEN, payload: token}
}