import { createAsyncThunk } from "@reduxjs/toolkit";
import { pb } from "../../../Pocketbase/pocketbase";
import Swal from "sweetalert2";


export const catagoriesData = createAsyncThunk("catagoriesData",
    async (obj) => {
      
        try {
            const records = await pb.collection('categories').getList(obj.page, obj.pageSize, {
                sort: '-created',
            });
            const data = records.items
            
            return {
                data,
                page: records?.page,
                perPage: records?.perPage,
                totalItems: records?.totalItems,
                totalPages: records?.totalPages
            };
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    })

export const deleteCatagories = createAsyncThunk("deleteCatagories", async (id) => {

    try {
       
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this catagories!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        });

       
        if (result.isConfirmed) {
            await pb.collection('categories').delete(`${id}`);
            await Swal.fire({
                title: 'Deleted!',
                text: 'Your catagories has been deleted.',
                icon: 'success'
            });

        } else {
            Swal.fire('Cancelled', 'Your catagories is safe :)', 'info');
            return {}; // Return empty object or handle accordingly
        }
    }
    catch (error) {

        console.error("Error deleting catagoriess:", error);
        throw error; // Re-throw the error to be caught by Redux Toolkit
    }
})

