import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact, editContact } from "./operations";

const contactsSlice = createSlice({
    name: "contacts",
    initialState: {
        items: [],
        currentContact: null,
        loading: false,
        error: null

    },
    reducers: {
        setCurrentContact: (state, action) => {
            state.currentContact = action.payload;
        }
    },
    extraReducers: (builder) => {
        return builder
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(addContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(addContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter((contact) => contact.id !== action.payload.id)
            })
            .addCase(deleteContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(editContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editContact.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.items.findIndex((contact) => contact.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                state.currentContact = null;
            })
            .addCase(editContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});


export default contactsSlice.reducer;

export const { setCurrentContact } = contactsSlice.actions
