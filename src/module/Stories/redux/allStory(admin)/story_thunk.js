import { createAsyncThunk } from "@reduxjs/toolkit";
import { pb } from "../../../../Pocketbase/pocketbase";



export const storiesData = createAsyncThunk("storiesData", async (obj) => {
    try {
        const records = await pb.collection('New_Story_view').getList(obj.page, obj.pageSize, {
            sort: '-created',filter:'is_deleted=false'
        });
        
        const data = records?.items?.filter((item) => item?.status === 'published' || item?.status === 'pending')

        return {
            data,
            page: records.page,
            perPage: records.perPage,
            totalItems: records.totalItems,
            totalPages: records.totalPages
        };

    }
    catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
});
