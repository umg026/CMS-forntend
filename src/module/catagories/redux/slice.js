import { createSlice } from "@reduxjs/toolkit";
import { catagoriesData } from "./thunk";

export const catagoiresSlicer = createSlice({
    name: "catagoriesData",
    initialState: {
        isLoading: false,
        isError: false,
        data: null,
        page: 1,
        perPage: 5,
        totalItems: 0,
        totalPages: 0,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(catagoriesData.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });

        builder.addCase(catagoriesData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.page = action.payload.page;
            state.perPage = action.payload.perPage;
            state.totalItems = action.payload.totalItems;
            state.totalPages = action.payload.totalPages;
        });

        builder.addCase(catagoriesData.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
});

export default catagoiresSlicer.reducer;