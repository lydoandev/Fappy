export const CHANGE_DEVICE_TOKEN  = "CHANGE_DEVICE_TOKEN";

export const GET_STARTED = "GET_STARTED"

export const changeDiviceToken = (token) => {
    return { type: CHANGE_DEVICE_TOKEN, payload: token }
}

export const getStarted = () => {
    return { type: GET_STARTED }
}
