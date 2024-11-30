import { createSelector } from "@reduxjs/toolkit";
import { selectFilterValue } from "../filters/selectors";

export const selectContacts = (state) => state.contacts.items;

export const selectCurrentContact = (state) => state.contacts.currentContact;

export const selectLoader = (state) => state.contacts.loading;

export const selectContactError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
    [selectContacts, selectFilterValue],

    (contacts, filter) => {
        const normalizedFilter = filter.toLowerCase();
        console.log(contacts);

        return contacts.filter((contact) => {
            console.log(contact);
            if (!contact) return false;
            const matchesName = contact.name?.toLowerCase().includes(normalizedFilter);
            const matchesNumber = contact.number?.includes(normalizedFilter);

            return matchesName || matchesNumber;
        })
    }
)