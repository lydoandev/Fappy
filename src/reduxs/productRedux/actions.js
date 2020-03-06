export const FETCH_HOME = "FETCH_HOME"
export const FETCH_HOME_SUCCESSED = "FETCH_HOME_SUCCESSED"

export const fetchHome = () => {
    return { type: FETCH_HOME}
}


export const fetchHomeSuccessed = () => {
    return { type: FETCH_HOME_SUCCESSED}
}