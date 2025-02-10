const DEFAULT_STATE = {
    items: [],
}

export const cartReducer = (state = DEFAULT_STATE, action) => {
    if (action.type == "CART_GET") {
        const dupState = {...state}

        dupState.items = action.payload

        return dupState
    }

    return state;
}




      