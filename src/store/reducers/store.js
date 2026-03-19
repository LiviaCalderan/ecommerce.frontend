import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./ProductReducer";
import { errorReducer } from "./ErrorReducer";
import { cartReducer } from "./CartReducer";
import { authReducer } from "./authReducer";
import { paymentMethodReducer } from "./paymentMethodReducer";

const user = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : null;

const selectedUserCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS") ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS")) : [];

const initialState = {
    auth: { user: user, selectedUserCheckoutAddress }
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