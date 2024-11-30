import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const instance = axios.create({
    baseURL: "https://contacts-app-x4p7.onrender.com/"
})

const setAuthHeader = (token) => {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
    instance.defaults.headers.common.Authorization = '';
};


export const register = createAsyncThunk(
    "auth/register",
    async (formData, thunkAPI) => {
        try {
            const { data } = await instance.post("auth/register", formData)
            setAuthHeader(data.token)

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)


export const login = createAsyncThunk(
    "auth/login",
    async (formData, thunkAPI) => {
        try {
            const { data } = await instance.post("auth/login", formData)
            setAuthHeader(data.accessToken)
            console.log("opr", data);

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)


export const logout = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            await instance.post("auth/logout")
            clearAuthHeader();
            return;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)


export const refreshUser = createAsyncThunk(
    "auth/refresh",
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const token = state.auth.token;


        if (token === null) {
            return thunkAPI.rejectWithValue('Unable to fetch user');
        }

        try {
            setAuthHeader(token);
            const { data } = await instance.get("auth/refresh")
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    },
    {
        condition: (_, thunkAPI) => {
            const state = thunkAPI.getState();
            const token = state.auth.token;

            if (token) return true;

            return false;
        }
    }
)
