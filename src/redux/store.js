import { configureStore } from "@reduxjs/toolkit";
import contactsSlice from "./contacts/slice";
import filtersSlice from "./filters/slice";


export const store = configureStore({
    reducer: {
        contacts: contactsSlice,
        filters: filtersSlice,
    },

});