import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./ProductReducer";
import { errorReducer } from "./ErrorReducer";
import { cartReducer } from "./CartReducer";
import { authReducer } from "./authReducer";
import { paymentMethodReducer } from "./paymentMethodReducer";

const user = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : null;

const cartItemsStored = localStorage.getItem("cartItemsStored") ? JSON.parse(localStorage.getItem("cartItemsStored")) : [];

const initialState = {
    carts: { cart: cartItemsStored },
    auth: { user: user }
}

export const store = configureStore({
    reducer: {
        products: productReducer,
        errors: errorReducer,
        carts: cartReducer,
        auth: authReducer,
        payment: paymentMethodReducer
    },
    preloadedState: initialState
})

export default store;