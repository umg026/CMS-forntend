import { createSlice } from "@reduxjs/toolkit";
import { roleData } from "./thunk";


export const roleDataSlice = createSlice({
    name: "roleData",
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
        builder.addCase(roleData.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(roleData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.data;
            state.page = action.payload.page;
            state.perPage = action.payload.perPage;
            state.totalItems = action.payload.totalItems;
            state.totalPages = action.payload.totalPages;
        });
        builder.addCase(roleData.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
});

export default roleDataSlice.reducer;
