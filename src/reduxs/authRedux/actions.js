
export const LOGIN_SUCCESSED = "LOGIN_SUCCESSED"

export const LOGOUT = "LOGOUT"


export const loginSuccessed = (user) => {
  return { type: LOGIN_SUCCESSED, payload: user }
}

export const logout = () => {
  return { type: LOGOUT }
}