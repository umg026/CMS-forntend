import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosInstance from '../../../axiosInstance/axiosInstance';
import { Formik, Form, Field } from 'formik';
import { roleSchema } from '../../../shared/validation/role';
import Select from 'react-select';
import Forms from '../components/Form'
import Swal from 'sweetalert2';

function Role_create() {

    const redirect = useNavigate()
    const initialValues = {
        selectRole: "", // selctrole var
        role_name: "", // formdata.role_name var 
        permission: "", // inputValue var 
    }

    // ====== React Select ==========
    const [selectedPermision, setSelectedPermision] = useState(null);
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);


    const [role, setRole] = useState("")
    const [selectedValues, setSelectedValues] = useState([]); // take value form api filter store in array



    useEffect(() => {
        if (role !== null) {
            fetch();
        }
    }, [role]);

    const fetch = async () => {
        try {
            const list = await axiosInstance.get(`/api/collections/permission/records?filter=(role_type='${role}')`);
            setSelectedValues(list.data.items)
            console.log(list.data.items)
        }
        catch (error) {
            console.error("Error fetching records:", error);
        }
    }

    const formikProps = {
        initialValues,
        validationSchema: roleSchema, // validation schema
        onSubmit: async (value, { resetForm }) => {

            try {
                let arr = []
                let postPermission = selectedPermision.map(item => item.id)
                // arr.push(postPermission)
                // console.log("postPermission", postPermission)
                // console.log(typeof postPermission)

                const res = await axiosInstance.post(`/admin/role/create`, {
                    ...value,
                    "permissions": postPermission,
                    "role_type": value.selectRole,
                    "role_name": value.role_name
                });

                if (res.data.msg === "Role already exists!") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Role Already Exists!',
                    });
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Your Role Create Successfully...',
                    });
                    redirect("/role")
                    resetForm();
                }
            }
            catch (error) {
                console.error("Error creating role:", error);
                // toast.error(`${error.response.data.msg}`);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.response.data.msg}`,
                });
            }
        }
    }

    return (
        <>
            {/* ====================================== */}
            <div className="page-content">
                <div className="main-wrapper">
                    <div className="user-form-main">
                        <Formik {...formikProps}>
                            {(formik) => {

                                return <Forms
                                    selectedPermision={selectedPermision}
                                    setRole={setRole}
                                    isClearable={isClearable}
                                    isSearchable={isSearchable}
                                    selectedValues={selectedValues}
                                    setSelectedPermision={setSelectedPermision}
                                    formik={formik} />
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
        </>


    )
}

export default Role_create


