import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../axiosInstance/axiosInstance'
import { toast } from 'react-toastify';
import { Formik, Field, Form } from 'formik';
import { validation } from '../../shared/validation/profile';
import Swal from 'sweetalert2';


const initialVlaues = {
    Firstname: "",
    Lastname: "",
    website: "",
    username: "",
    email: "",
    avatar: "",
    verified: true,
}

function Profile_edit() {

    const { id } = useParams() // fetch id from admin profile via route
    const redirect = useNavigate()

    const [formData, setformData] = useState(initialVlaues)
    const [image, setImage] = useState("")


    const handelImage = (e) => {
        // console.log("handel image :", e.target.files[0])
        setImage(e.target.files[0]);
    }
    useEffect(() => {
        fetchData();
    }, [])


    const fetchData = async () => {
        try {
            const res = await axiosInstance.get(`/api/collections/user_view/records/${id}`);
            setformData(res.data);
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    if (!formData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="page-content">
                <div className="main-wrapper">
                    <div className="user-profile-main">
                        <div className="flex justify-between mx-7 ">
                            <h1 className='text-xl'>Update Your Profile</h1>
                            <Link to="/profile" type="submit" className="btn btn-primary mb-2 -mt-3">Back</Link>
                        </div>
                        <hr className='bg-black  mx-0 my-2' />
                        <Formik
                            enableReinitialize={true}
                            initialValues={formData}
                            validationSchema={validation}
                            onSubmit={async (values) => {

                                try {
                                    if (!image) {
                                        toast.error("please select an image")
                                        return
                                    }
                                    let formData = new FormData();
            
                                    formData.append("avatar", image);

                                    console.log("FormData:", formData.get('avatar'));

                                    const update = await axiosInstance.patch(`/user/update`, {

                                        "userid": `${id}`,
                                        "roleid": values?.role_id,
                                        "avatar": formData.get('avatar'),
                                        "email": values.email,
                                        "role_name": values.role_name,
                                        "permissions": `[${values.permission_id}]`,
                                        "role_type": values.role_type,
                                        "username": values.username,
                                        "website": values.website,
                                        "Firstname": values.Firstname,
                                        "Lastname": values.Lastname

                                    }, {
                                        headers: {
                                            'Content-Type': 'multipart/form-data'
                                        }
                                    });

                                    console.log("update", update)
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Profile Update suceessfully...',
                                      });
                                    // toast.success("Profile Update Successfully")
                                    redirect("/profile")

                                } catch (error) {
                                    console.log(error);
                                    toast.error(`${error.response.data.data.msg}`)
                                }
                            }}
                        >

                            {
                                (formik) => {
                                    console.log("formik error :", formik.errors)
                                    console.log("formik values :", formik.values)


                                    return <Form>
                                        <div className="space-y-12">
                                            <div className="border-b border-gray-900/10 pb-12">
                                                <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                                    <div className="sm:col-span-4">
                                                        <div className="mt-2">
                                                            <label htmlFor="Firstname" className="form-label label-size">Firstname : </label>
                                                            <div className="flex rounded-md sm:max-w-md">
                                                                <Field type="text" name="Firstname" id="Firstname" className="form-control" placeholder="Enter frist name" aria-label="name" />
                                                            </div>
                                                            {formik.errors.Firstname && formik.touched.Firstname ? <p className='text-red-500'>{formik.errors.Firstname}</p> : null}

                                                        </div>
                                                    </div>
                                                    <div className="sm:col-span-4">
                                                        <div className="mt-2">
                                                            <label htmlFor="Lastname" className="form-label label-size">Lastname : </label>

                                                            <div className="flex rounded-md sm:max-w-md">
                                                                <Field type="text" name="Lastname" id="Lastname" className="form-control" placeholder="Enter last name" aria-label="name" />
                                                            </div>
                                                            {formik.errors.Lastname && formik.touched.Lastname ? <p className='text-red-500'>{formik.errors.Lastname}</p> : null}

                                                        </div>
                                                    </div>
                                                    <div className="sm:col-span-4">
                                                        <div className="mt-2">
                                                            <label htmlFor="website" className="form-label label-size">Website : </label>

                                                            <div className="flex rounded-md sm:max-w-md">
                                                                <Field type="text" name="website" id="website" className="form-control" placeholder="Enter website" aria-label="name" />
                                                            </div>
                                                            {formik.errors.website && formik.touched.website ? <p className='text-red-500'>{formik.errors.website}</p> : null}

                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-4">
                                                        <div className="mt-2">
                                                            <label htmlFor="username" className="form-label label-size">Username : </label>

                                                            <div className="flex rounded-md sm:max-w-md">
                                                                <Field type="text" name="username" id="username" className="form-control" placeholder="Enter username" aria-label="name" />
                                                            </div>
                                                            {formik.errors.username && formik.touched.username ? <p className='text-red-500'>{formik.errors.username}</p> : null}

                                                        </div>
                                                    </div>
                                                    <div className="sm:col-span-4">
                                                        <div className="mt-2">
                                                            <label htmlFor="email" className="form-label label-size">Email : </label>

                                                            <div className="flex rounded-md sm:max-w-md">
                                                                <Field type="text" name="email" id="email" className="form-control" placeholder="Enter email name" aria-label="name" />
                                                            </div>
                                                            {formik.errors.email && formik.touched.email ? <p className='text-red-500'>{formik.errors.email}</p> : null}

                                                        </div>
                                                    </div>
                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Profile Image
                                                        </label>
                                                        <div className="mt-2">
                                                            {
                                                                id !== null ?
                                                                    <img src={`http://192.168.1.116:8090/api/files/users/${id}/${formik?.values?.avatar}?thumb=100x100`} className='rounded-full mt-2' alt="" />
                                                                    : ""
                                                            }
                                                            <div>
                                                                <input
                                                                    onChange={handelImage}
                                                                    type="file" name='avatar' className="form-control mt-3 w-full max-w-96" />
                                                            </div>
                                                            {formik.errors.avatar && formik.touched.avatar ? <p className='text-red-500'>{formik.errors.avatar}</p> : null}

                                                        </div>
                                                    </div>
                                                    <div className="sm:col-span-4">
                                                        <Link to={`/admin/profile/change_password/${id}`} className='text-blue-500'>Change Passoword ?</Link>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-6 flex items-center justify-end gap-x-6">
                                            <Link type="button" to="/profile" className="text-sm font-semibold leading-6 text-gray-900">
                                                Cancel
                                            </Link>
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </Form>
                                }
                            }
                        </Formik>

                    </div>
                </div>
            </div>
        </>

    )
}

export default Profile_edit

