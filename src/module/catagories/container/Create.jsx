import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axiosInstance from '../../../axiosInstance/axiosInstance'
import useDetails from '../../../shared/ui/permission/useDetails'
import { Formik, Form, Field } from 'formik'
import { catagoriesCreate } from '../../../shared/validation/catagories'
import Forms from '../components/Forms'
import { useDispatch } from 'react-redux'
import { catagoriesData } from '../redux/thunk'
import Swal from 'sweetalert2'

const initialValues = {
    name: "",
    slug: "",
    description: "",
}

function Create() {
    const dispatch = useDispatch()
    const { role, permission } = useDetails() // fetch permission form locals
  
    const formikProps = {
        initialValues,
        validationSchema: catagoriesCreate, // validation schema
        onSubmit: async (value, action) => {
        const createPermi = permission?.map(item => item.categories == "create")
            if ( createPermi) {
                try {
                    const slug = value?.slug?.trim().replace(/\s+/g, "_")
                    await axiosInstance.post("/api/collections/categories/records", {
                        ...value, "tag_ids": [], slug
                    })
                    dispatch(catagoriesData(1, 10))
                    Swal.fire({
                        icon: 'success',
                        title: 'Your Catagories Create Successfully...',
                    });
                    action.resetForm()
                    return false;
                }
                catch (error) {
                    throw error;
                }
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Sorry You Dont Have Permission!',
                });
            }
        }
    }

    return (
        <>
            <Formik {...formikProps}>
                {formik => {
                    return <Forms formik={formik} />
                }}
            </Formik>


        </>
    )
}

export default Create

