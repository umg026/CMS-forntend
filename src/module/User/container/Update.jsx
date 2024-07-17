import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../axiosInstance/axiosInstance';
import pb from '../../../Pocketbase/pocketbase';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik'
import { user } from '../../../shared/validation/user';
import Select from 'react-select';
import * as Yup from 'yup'
import Froms from '../components/Froms';
import Swal from 'sweetalert2';

const validation = Yup.object({
    username: Yup.string().min(2).max(20).required("please enter username"),
    Firstname: Yup.string().min(2).max(20).required("please enter fristname"),
    Lastname: Yup.string().min(2).max(20).required("please enter lastname"),
    website: Yup.string().required("please enter web-link"),
    email: Yup.string().email().required("please enter email"),
})

function UserUpdate() {
    const redirect = useNavigate()
    const { id } = useParams()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [formdata, setformdata] = useState()
    const initialValues = {
        username: formdata?.username,
        Firstname: formdata?.Firstname,
        Lastname: formdata?.Lastname,
        website: formdata?.website,
        email: formdata?.email,
    }
    const [newPassword, setNewPasword] = useState("")
    const [oldPass, setOldPass] = useState("")

    // =======================
    const [selectedRole, setSelectedRole] = useState(null);
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);


    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const list = await axiosInstance.get('/api/collections/role/records');
            // console.log(list.data.items)
            setData(list.data.items);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const record = await pb.collection('users').getOne(`${id}`, {
                    expand: 'role_id',
                });
                setSelectedRole(record.expand.role_id)
                setLoading(false)
                setformdata(record)

                // setInputValue(record.expand.role_id.role_name)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [id])

    if (loading) {
        return <h1>loading.......</h1>
    }


    return (
        <>
            <div className="page-content">
                <div className="main-wrapper">
                    <div className="user-form-main">
                        <div className="row">
                            <div className="col-6">
                                <h3 className="m-0 title-h3">Update User</h3>
                            </div>
                            <div className="col-6 text-end">
                                <Link
                                    to="/users"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Back
                                </Link>
                            </div>
                        </div>
                        <hr className="my-3" />
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validation}
                            onSubmit={async (values, actions) => {

                                try {
                                    if (newPassword.length < 5) {
                                        toast.error("new password must be 5 character")
                                        return
                                    }
                                    const role = selectedRole?.id;
                                    const update = await axiosInstance.patch(`/user/update`, {
                                        ...values,
                                        "userid": id,
                                        "roleid": role,
                                        "adminpsswd": values.password,
                                        "password": `${newPassword}`,
                                        "oldPassword": oldPass,
                                        "passwordConfirm": `${newPassword}`,
                                    }, {
                                        headers: {
                                            'Content-Type': 'multipart/form-data'
                                        }
                                    });
                                    // console.log("update", update)

                                    if (update.status === 200) {
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'User update Successfully...',
                                          });
                                        redirect("/users");
                                    } else {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'something went wrong!',
                                        });
                                    }
                                } catch (error) {
                                    console.error(error);
                                    toast.error(`${error?.response?.data?.res?.data?.oldPassword?.message}` || `${error?.response?.data?.message}` || `${error?.response?.data?.res?.data?.email?.message}`);
                                }
                            }}>
                            {
                                (formik) => {
                                    // console.log("formik values", formik.values)
                                    // console.log("formik error", formik.errors)

                                    return <Froms
                                        oldPass={oldPass}
                                        setOldPass={setOldPass}
                                        newPassword={newPassword}
                                        setNewPasword={setNewPasword}
                                        setSelectedRole={setSelectedRole}
                                        data={data}
                                        isSearchable={isSearchable}
                                        isClearable={isClearable}
                                        selectedRole={selectedRole}
                                        formik={formik} />
                                }
                            }
                        </Formik>
                    </div>

                </div>
            </div >
        </>
    );
}
export default UserUpdate;
