import { configureStore } from "@reduxjs/toolkit";
import contactsSlice from "./contacts/slice";
import filtersSlice from "./filters/slice";
import { authReducer } from "./auth/slice";


import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const authConfig = {
    key: "token",
    storage,
    whitelist: ["token"],
};


export const store = configureStore({
    reducer: {
        contacts: contactsSlice,
        filters: filtersSlice,
        auth: persistReducer(authConfig, authReducer),
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),

});

export const persistor = persistStore(store);