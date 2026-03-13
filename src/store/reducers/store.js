import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./ProductReducer";
import { errorReducer } from "./ErrorReducer";
import { cartReducer } from "./CartReducer";
import { authReducer } from "./authReducer";

const user = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : null;

const cartItemsStored = localStorage.getItem("cartItemsStored") ? JSON.parse(localStorage.getItem("cartItemsStored")) : [];

const initialState = {
    carts: {cart: cartItemsStored}
}

export const store = configureStore({
    reducer: {
        products: productReducer,
        errors: errorReducer,
        carts: cartReducer,
        auth: authReducer
    },
    preloadedState: initialState
})

export default store;