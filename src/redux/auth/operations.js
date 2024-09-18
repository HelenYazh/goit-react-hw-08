import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const instance = axios.create({
    baseURL: "https://connections-api.goit.global/"
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
            const { data } = await instance.post("users/signup", formData)
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
            const { data } = await instance.post("users/login", formData)
            setAuthHeader(data.token)
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
            await instance.post("users/logout")
            clearAuthHeader();
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
            const { data } = await instance.get("users/current")
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
