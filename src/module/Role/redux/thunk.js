import { createAsyncThunk } from "@reduxjs/toolkit";
import { pb } from "../../../Pocketbase/pocketbase";
import { toast } from "react-toastify";
import axiosInstance from "../../../axiosInstance/axiosInstance";
import Swal from "sweetalert2";


// get the data of Role 
export const roleData = createAsyncThunk("roleData", async (obj) => {
    try {
        const data = await pb.collection('Role_view').getList(obj.page, obj.pageSize, {
            sort: '-created',
            filter: 'is_deleted=false'
        });

        return {
            data,
            page: data.page,
            perPage: data.perPage,
            totalItems: data.totalItems,
            totalPages: data.totalPages
        };
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});

// delete the Role using id 
export const deleteRole = createAsyncThunk("deleteRole", async (id) => {

    try {
        // Show confirmation dialog using SweetAlert
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this role!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        });

        if (result.isConfirmed) {
            const res = await axiosInstance.delete(`http://192.168.1.116:8090/admin/role/delete/${id}`);
            //   console.log("respose :", res)
            await Swal.fire({
                title: 'Deleted!',
                text: 'Your role has been deleted.',
                icon: 'success'
            });
        }
        else {

            Swal.fire('Cancelled', 'Your user is role :)', 'info');
            return {};
        }
    }
    catch (error) {
        // Handle errors
        toast.error(`${error.response.data.msg}`);
        console.error("Error deleting user:", error);
        throw error;
    }
});