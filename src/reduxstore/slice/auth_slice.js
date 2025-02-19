import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = "user";
const TOKEN_KEY = "token";
const AUTH_KEY = "isAuthenticated";

export const loadAuthState = createAsyncThunk("auth/loadAuthState", async () => {
    try {
        const user = await AsyncStorage.getItem(USER_KEY);
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        const isAuthenticated = await AsyncStorage.getItem(AUTH_KEY);

        return {
            user: user ? JSON.parse(user) : null,
            token: token || null,
            isAuthenticated: isAuthenticated === "true",
        };
    } catch (error) {
        console.error("Failed to load auth state", error);
        return { user: null, token: null, isAuthenticated: false };
    }
});

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true, 
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;

            // Save to AsyncStorage
            AsyncStorage.setItem(USER_KEY, JSON.stringify(action.payload.user));
            AsyncStorage.setItem(TOKEN_KEY, action.payload.token);
            AsyncStorage.setItem(AUTH_KEY, "true");
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

            // Remove from AsyncStorage
            AsyncStorage.removeItem(USER_KEY);
            AsyncStorage.removeItem(TOKEN_KEY);
            AsyncStorage.removeItem(AUTH_KEY);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadAuthState.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.isLoading = false;
        });
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
