export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const LOGOUT = 'LOGOUT';
export const UPDATE_DEVICE_TOKEN = "UPDATE_DEVICE_TOKEN"

export const UPDATE_DEVICE_TOKEN_SUCCESSED = "UPDATE_DEVICE_TOKEN_SUCCESSED"

export const login = user => {
  return {type: LOGIN, payload: user};
};

export const loginSuccess = response => {
  return {type: LOGIN_SUCCESS, payload: response};
};

export const loginFailure = error => {
  return {type: LOGIN_FAILURE, payload: error};
};

export const register = newUser => {
  return {type: REGISTER, payload: newUser};
};

export const registerSuccess = response => {
  return {type: REGISTER_SUCCESS, payload: response};
};

export const registerFailure = error => {
  return {type: REGISTER_FAILURE, payload: error};
};

export const logout = user => {
  return {type: LOGOUT, payload: user};
};

export const updateDeviceToken = (token) => {
  return { type: UPDATE_DEVICE_TOKEN, payload: token}
}
