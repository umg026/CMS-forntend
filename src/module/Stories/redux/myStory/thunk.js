import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../axiosInstance/axiosInstance";

export const myStories = createAsyncThunk("myStories", async (email) => {
    try {
        const record = await axiosInstance.get(`/api/collections/New_Story_view/records?sort=-updated`)
        const data = record?.data?.items?.filter((item) => item.email === email && item.is_deleted === false)

        return data;
    }
    catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
});
