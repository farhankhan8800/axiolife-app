import { configureStore } from "@reduxjs/toolkit";
import auth_slice from './slice/auth_slice'
import cart_slice from './slice/cart_slice'


export const store_redux = configureStore({
    reducer: {
        auth: auth_slice,
        cart: cart_slice
    },
});

