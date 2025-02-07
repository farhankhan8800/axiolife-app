import { configureStore } from "@reduxjs/toolkit";
import auth_slice from './slice/auth_slice'


export const store_redux = configureStore({
    reducer: {
        auth: auth_slice,
    },
});

export type AppDispatch = typeof store_redux.dispatch;