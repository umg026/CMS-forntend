import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosInstance from '../../../axiosInstance/axiosInstance';
import { pb } from '../../../Pocketbase/pocketbase';
import { Field, Form, Formik } from 'formik';
import { roleSchema } from '../../../shared/validation/role';
import Select from 'react-select';
import Forms from '../components/Form';
import Swal from 'sweetalert2';


function Role_update() {

    const { id } = useParams()
    const redirect = useNavigate()
    const [role, setRole] = useState("")
    const [loading, setLoading] = useState(true);
    const [isUpdate, setIsUpdate] = useState(true)
    // input suggestions :
    const [selectrole, setSelectRole] = useState(""); // select Role type variable 
    const [selectedValues, setSelectedValues] = useState([]); // take value form api filter store in array


    const [selectedPermision, setSelectedPermision] = useState(null);
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (selectrole) {

            fetchPermission()
        }
    }, [selectrole]);

    const fetchData = async () => {
        try {
            const res = await pb.collection('Role_view').getOne(`${id}`, {
                expand: 'permission_id'
            });
            setRole(res.role_name);
            setSelectRole(res.role_type);
            setSelectedPermision(res?.expand?.permission_id)
            setLoading(false);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const fetchPermission = async () => {
        try {

            if (!selectedValues) {
                return
            }
            const list = await axiosInstance.get(`/api/collections/permission/records?filter=(role_type='${selectrole}')`)

            setSelectedValues(list?.data?.items)

        }
        catch (error) {
            console.error("Error fetching records:", error);
        }
    }


    const formikProps = {
        initialValues: {
            selectRole: selectrole, // selctrole var
            role_name: role, // formdata.role_name var 
            permissions: "", // inputValue var 
        },
        validationSchema: roleSchema, // validation schema
        onSubmit: async (value, action) => {
            try {
                const newPerm = selectedPermision.map(item => item.id)
                // console.log(typeof newPerm)
                // console.log(newPerm)
                const res = await axiosInstance.patch(`/admin/role/update`, {
                    "auth": {
                        "roleID": `${id}`
                    },
                    "data": {
                        "role_type": selectrole,
                        "permissions": newPerm,
                        "role_name": value.role_name,
                    }
                });
                console.log("response", res)
                if (res.data.msg === "Role already exists!") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Role Already Exists!',
                    });
                }
                else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Your Role update Successfully...',
                    });
                    redirect("/role")
                    // resetForm();
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

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <div className="page-content">
                <div className="main-wrapper">
                    <div className="user-form-main">
                        <Formik {...formikProps}>
                            {(formik) => {
                                return <Forms
                                    setIsUpdate={setIsUpdate}
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

export default Role_update


