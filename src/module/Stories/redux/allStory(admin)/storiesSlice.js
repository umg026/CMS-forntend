import { createSlice } from "@reduxjs/toolkit";
import { storiesData } from "./story_thunk";

export const storiesSlicer = createSlice({
    name: "storiesData",
    initialState: {
        isLoading: false,
        isError: false,
        data: null,
        page: 1,
        perPage: 5,
        totalItems: 0,
        totalPages: 0,
    },
    extraReducers: (builder) => {
        builder.addCase(storiesData.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });

        builder.addCase(storiesData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.data;
            // console.log(action.payload)
            state.page = action.payload.page;
            state.perPage = action.payload.perPage;
            state.totalItems = action.payload.totalItems;
            state.totalPages = action.payload.totalPages;
        });

        builder.addCase(storiesData.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
});

export default storiesSlicer.reducer;