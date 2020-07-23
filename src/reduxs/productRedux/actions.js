export const FETCH_CART = "FETCH_CART"
export const FETCH_CART_SUCCESSED = "FETCH_CART_SUCCESSED"
export const FETCH_ORDER = "FETCH_ORDER"
export const FETCH_ORDER_SUCCESSED = "FETCH_ORDER_SUCCESSED"
export const FETCH_DATA = "FETCH_DATA"
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS"
export const FETCH_NOTIFICATION= "FETCH_NOTIFICATION"
export const FETCH_NOTIFICATION_SUCCESSED = "FETCH_NOTIFICATION_SUCCESSED"

export const fetchData = () => {
    return {type: FETCH_DATA, payload: {}}
}

export const fetchCart = (userId) => {
    return { type: FETCH_CART, payload: userId}
}

export const fetchOrder = (userId) => {
    return { type: FETCH_ORDER, payload: userId}
}

export const fetchNotification = (userId) => {
    return { type: FETCH_NOTIFICATION, payload: userId}
}

export const fetchCartSuccessed = (cart) => {
    return { type: FETCH_CART_SUCCESSED, payload: cart}
}