import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../auth/operations";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/selectors.js";


export const fetchContacts = createAsyncThunk(
    "contacts/fetchAll",
    async (_, thunkApi) => {
        const token = useSelector(selectToken);
        try {
            instance.defaults.headers.common.Authorization = `Bearer ${token}`;
            const { data } = await instance.get("/contacts");
            return data.data;

        } catch (error) {
            thunkApi.rejectWithValue(error.message);
        }
    }
)


export const addContact = createAsyncThunk(
    "contacts/addContact",
    async (contact, thunkApi) => {
        try {
            console.log(contact);

            const token = useSelector(selectToken);
            instance.defaults.headers.common.Authorization = `Bearer ${token}`;

            const { data } = await instance.post("/contacts", contact);
            return data;

        } catch (error) {
            thunkApi.rejectWithValue(error.message);
        }
    }
)

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (contactId, thunkApi) => {
        try {
            const { data } = await instance.delete(`contacts/${contactId}`);
            return data;

        } catch (error) {
            thunkApi.rejectWithValue(error.message);
        }
    }
)

export const editContact = createAsyncThunk(
    "contacts/editContact",
    async ({ id, ...updatedContact }, thunkApi) => {
        try {
            const { data } = await instance.patch(`contacts/${id}`, updatedContact);
            return data;

        } catch (error) {
            thunkApi.rejectWithValue(error.message);
        }
    }
)