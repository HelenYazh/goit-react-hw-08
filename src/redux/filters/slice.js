import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        filterValue: ""
    },
    reducers: {
        changeFilter: (state, action) => {
            state.filterValue = action.payload;
        },
    },
});


export const { changeFilter } = filtersSlice.actions;

export default filtersSlice.reducer;