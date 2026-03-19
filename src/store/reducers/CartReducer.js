const initialState = {
    cart: {
        products: [],
        totalPrice: 0,
        cartId: null
    }
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_CART":
            return {
                ...state,
                cart: action.payload
            }

        case "REMOVE_CART_ITEM":
            if (!action.payload || !action.payload.cartId) return state;
            return {
                ...state,
                cart: action.payload
            }
            
        case "CLEAR_CART":
            return {
                ...state,
                cart: {
                    products: [],
                    totalPrice: 0,
                    cartId: null
                }
            }
        default:
            return state;
    }
    return state;
}
