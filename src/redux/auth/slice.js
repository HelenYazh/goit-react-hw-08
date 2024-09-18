import { createSlice } from "@reduxjs/toolkit"
import { register, login, refreshUser } from "./operations"

const INIT_STATE = {
    user: {
        name: null,
        email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
}


const authSlice = createSlice({
    name: "auth",
    initialState: INIT_STATE,
    reducers: {},
    extraReducers: builder => builder
        .addCase(register.pending, (state) => {
            state.error = null;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        })
        .addCase(register.rejected, (state, action) => {
            state.error = action.payload;
        })
        .addCase(login.pending, (state) => {
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        })
        .addCase(login.rejected, (state, action) => {
            state.error = action.payload;
        })
        .addCase(refreshUser.pending, (state) => {
            state.error = null;
            state.isRefreshing = true;
        })
        .addCase(refreshUser.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
            state.isRefreshing = false;
        })
        .addCase(refreshUser.rejected, (state, action) => {
            state.error = action.payload;
            state.isRefreshing = false;
        })
})

export const authReducer = authSlice.reducer;