import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../axiosInstance/axiosInstance';
import pb from '../../../Pocketbase/pocketbase';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik'
import { user } from '../../../shared/validation/user';
import Select from 'react-select';
import Froms from '../components/Froms';
import Swal from 'sweetalert2';

const initialValues = {
    username: '',
    Firstname: '',
    Lastname: '',
    website: '',
    email: '',
    password: '',
}

function Trash() {
    const redirect = useNavigate()
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState(false)
    // ====== React Select ==========
    const [selectedRole, setSelectedRole] = useState(null);
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);


    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const list = await axiosInstance.get('/api/collections/role/records');
            setData(list.data.items);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="page-content">
                <div className="main-wrapper">
                    <div className="user-form-main">
                        <div className="row">
                            <div className="col-6">
                                <h3 className="m-0 title-h3">Add User</h3>
                            </div>
                            <div className="col-6 text-end">
                                <Link
                                    to="/users"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
                                    Back
                                </Link>
                            </div>
                        </div>
                        <hr className="my-3" />
                        <Formik
                            initialValues={initialValues}
                            validationSchema={user}
                            onSubmit={async (values, actions) => {

                                try {
                                    if (!selectedRole) {
                                        toast.error("please select the role")
                                        return;
                                    }

                                    const res = await pb.collection('users').create({
                                        "username": `${values.username}`,
                                        "email": `${values.email}`,
                                        "emailVisibility": true,
                                        "password": `${values.password}`,
                                        "passwordConfirm": `${values.password}`,
                                        "role_id": `${selectedRole.id}`,
                                        "is_deleted": false,
                                        "Firstname": `${values.Firstname}`,
                                        "Lastname": `${values.Lastname}`,
                                        "website": `${values.website}`
                                    });
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'User created successfully...',
                                    });
                                    // toast.success("User created successfully");
                                    actions.resetForm();
                                    redirect("/users")

                                }
                                catch (error) {
                                    console.error(error);
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: `${error?.data?.data?.email?.message || error?.data?.message} `,
                                    });
                                    // toast.error(`${error?.data?.data?.email?.message || error?.data?.message} `);
                                }
                            }}>
                            {
                                (formik) => {

                                    return <Froms update={update} setSelectedRole={setSelectedRole} data={data} isSearchable={isSearchable} isClearable={isClearable} selectedRole={selectedRole} formik={formik} />
                                }
                            }
                        </Formik>
                    </div>

                </div>
            </div >
        </>
    );
}
export default Trash;