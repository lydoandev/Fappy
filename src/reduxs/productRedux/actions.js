export const FETCH_CART = "FETCH_CART"
export const FETCH_CART_SUCCESSED = "FETCH_CART_SUCCESSED"

export const fetchCart = (userId) => {
    return { type: FETCH_CART, payload: userId}
}


export const fetchCartSuccessed = (cart) => {
    return { type: FETCH_CART_SUCCESSED, payload: cart}
}