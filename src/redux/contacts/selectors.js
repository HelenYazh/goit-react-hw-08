import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "../filters/selectors";

export const selectContacts = (state) => state.contacts.items;

export const selectCurrentContact = (state) => state.contacts.currentContact;

export const selectLoader = (state) => state.contacts.loading;

export const selectContactError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
    [selectContacts, selectNameFilter],

    (contacts, filterName) => {
        return contacts.filter((contact) => {
            return contact.name.toLowerCase().includes(filterName.toLowerCase())
        })
    }
)