const User = (state = {}, {type, payload}) => {
    switch (type) {
    case "reset": {
        return {}
    }
    case "set": {
        return {...state, ...payload}
    }
    default: {
        return state
    }
    }
}

export default User;
