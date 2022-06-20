export const SetUser = (payload) => {
    return {
        type: "set",
        payload
    }
}
export const ResetUser = (payload) => {
    return {
        type: "reset",
        payload
    }
}
export const SetSearch = (type, data) => {
    return {
        type: type,
        payload: {
            data: data
        }
    }
}
