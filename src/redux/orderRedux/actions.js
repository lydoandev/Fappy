export const CHANGE_ORDER_STATUS = "CHANGE_ORDER_STATUS";

export const FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST"
export const FETCH_ORDERS_SUCCEEDED = "FETCH_ORDERS_SUCCEEDED"
export const FETCH_ORDERS_FAILED = "FETCH_ORDERS_FAILED"

export const fetchOrders = () => {
    return { type: FETCH_ORDERS_REQUEST }
}

export const changeOrderStatus = (status, orderId) => {
    return {
        type: CHANGE_ORDER_STATUS,
        payload: {
            status, orderId
        }
    }
}
