import { createAsyncThunk } from "@reduxjs/toolkit";
import { pb } from "../../../Pocketbase/pocketbase"
import axiosInstance from "../../../axiosInstance/axiosInstance";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';



// get the data of user 
export const userData = createAsyncThunk("userData", async (obj) => {
    try {

        const records = await pb.collection('users').getList(obj.page, obj.pageSize, {
            expand: 'role_id', sort: '-created', filter: 'is_deleted=false'
        });

        const data = records?.items?.filter((item) => (item.expand.role_id.role_type === "content_author" || item.expand.role_id.role_type === "admin"))

        return {
            data,
            page: records.page,
            perPage: records.perPage,
            totalItems: records.totalItems,
            totalPages: records.totalPages
        };
    }
    catch (error) {
        console.log(error);
    }
})

// delete the user using id 
export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
    try {
        // Show confirmation dialog using SweetAlert
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this user!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        });

        // If user confirms deletion
        if (result.isConfirmed) {
            const record = await axiosInstance.delete(`/user/delete`, {
                headers: {
                    "content-type": "application/json",
                },
                data: {
                    "userdata": {
                        "storyDelete": true,
                        "userid": `${id}`
                    }
                }
            });
            // Show success message using SweetAlert
            await Swal.fire({
                title: 'Deleted!',
                text: 'Your user has been deleted.',
                icon: 'success'
            });

            return record.data; // Return any relevant data to store if needed
        } else {
            // User canceled deletion
            Swal.fire('Cancelled', 'Your user is safe :)', 'info');
            return {}; // Return empty object or handle accordingly
        }
    }
    catch (error) {
        // Handle errors
        toast.error(`${error.response.data.message}`);
        console.error("Error deleting user:", error);
        throw error; // Re-throw the error to be caught by Redux Toolkit
    }
})
