import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Import Yup for schema validation
import { toast } from 'react-toastify';
import pb from '../../Pocketbase/pocketbase';

const initialValues = {
    old_password: '',
    new_password: '',
    confirm_password: ''
};

const passwordSchema = Yup.object().shape({
    old_password: Yup.string().required('Old Password is required'),
    new_password: Yup.string()
        .required('New Password is required')
        .min(5, 'Password must be at least 5 characters long'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
        .required('Confirm Password is required')
});

function Password_change() {
    const { id } = useParams(); // Assuming id is used correctly in your route
    const redirect = useNavigate()
    const handleSubmit = async (values, { setSubmitting }) => {

        try {
            await pb.collection('users').update(`${id}`, {
                "password": values.new_password,
                "passwordConfirm": values.confirm_password,
                "oldPassword": values.old_password,
            });

            toast.success("password update successfull")
            redirect("/admin/profile")

        }
        catch (error) {
            console.log(error)
            toast.error(`${error.response.data.msg}`)
        }
    };

    return (
        <div className="page-content">
            <div className="main-wrapper">
                <div className="user-profile-main">
                    <div className="flex justify-between mx-7">
                        <h1 className="text-2xl">Change Password:</h1>
                        <Link
                            to="/admin/profile"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Back
                        </Link>
                    </div>
                    <hr className="bg-black mx-7 my-2" />
                    <Formik
                        initialValues={initialValues}
                        validationSchema={passwordSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form className="px-7 md:p-16 py-10 xl:p-20">
                                <div className="space-y-12">
                                    <div className="border-b border-gray-900/10 pb-12">
                                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="sm:col-span-4">
                                                <label
                                                    htmlFor="old_password"
                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                >
                                                    Old Password:
                                                </label>
                                                <Field
                                                    type="password"
                                                    name="old_password"
                                                    id="old_password"
                                                    className="form-control"
                                                    placeholder="Old password"
                                                />
                                                <ErrorMessage
                                                    name="old_password"
                                                    component="p"
                                                    className="text-red-500"
                                                />
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label
                                                    htmlFor="new_password"
                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                >
                                                    New Password:
                                                </label>
                                                <Field
                                                    type="password"
                                                    name="new_password"
                                                    id="new_password"
                                                    className="form-control"
                                                    placeholder="New password"
                                                />
                                                <ErrorMessage
                                                    name="new_password"
                                                    component="p"
                                                    className="text-red-500"
                                                />
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label
                                                    htmlFor="confirm_password"
                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                >
                                                    Confirm New Password:
                                                </label>
                                                <Field
                                                    type="password"
                                                    name="confirm_password"
                                                    id="confirm_password"
                                                    className="form-control"
                                                    placeholder="Confirm New Password"
                                                />
                                                <ErrorMessage
                                                    name="confirm_password"
                                                    component="p"
                                                    className="text-red-500"
                                                />
                                            </div>
                                            <div className="sm:col-span-4">
                                                <Link to="" className="text-blue-500">
                                                    Forgot Password?
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <Link
                                        to="/admin/profile/"
                                        className="text-sm font-semibold leading-6 text-gray-900"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Save
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default Password_change;
