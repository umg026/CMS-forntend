import { createSlice } from "@reduxjs/toolkit";
import { myStories } from "./thunk";



export const mystorieSlice = createSlice({
    name: "myStories",
    initialState: {
        isLoading: false,
        isError: false,
        stdata: null,
    },
    extraReducers: (builder) => {
        builder.addCase(myStories.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });

        builder.addCase(myStories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.stdata = action.payload;
            state.page = action.payload.page;
            state.perPage = action.payload.perPage;
            state.totalItems = action.payload.totalItems;
            state.totalPages = action.payload.totalPages;
        });

        builder.addCase(myStories.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
});

export default mystorieSlice.reducer;