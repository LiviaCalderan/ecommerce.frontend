const initialState = {
    cart: [],
    totalPrice: 0,
    cartId: null
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CART":
            const productToAdd = action.payload;
            const existingProduct = state.cart.find(
                (item) => item.productId === productToAdd.productId
            );

            if (existingProduct) {
                const updatedCart = state.cart.map((item) => {
                    if (item.productId === productToAdd.productId) {
                        return {
                            ...item,
                            quantity: item.quantity + productToAdd.quantity
                        };
                    } else {
                        return item;
                    }
                })

                return {
                    ...state,
                    cart: updatedCart,
                }
            } else {
                const newCart = [...state.cart, productToAdd];
                return {
                    ...state,
                    cart: newCart
                }
            }
        case "UPDATE_CART_QUANTITY":
            return {
                ...state,
                cart: state.cart.map((item) => {
                    if (item.productId === action.payload.productId) {
                        return {
                            ...item,
                            quantity: action.payload.quantity
                        };
                    }
                    return item;
                })
            };
        case "REMOVE_CART_ITEM":
            return {
                ...state,
                cart: state.cart.filter(
                    (item)=> item.productId !== action.payload.productId
                )
            }
        default:
            return state;
    }
    return state;
}
