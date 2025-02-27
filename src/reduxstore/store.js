import { configureStore } from "@reduxjs/toolkit";
import auth_slice from './slice/auth_slice'
import cart_slice from './slice/cart_slice'
import wishlist_slice from './slice/wishlist_slice'



export const store_redux = configureStore({
    reducer: {
        auth: auth_slice,
        cart: cart_slice,
        wishlist: wishlist_slice,
    },
});

