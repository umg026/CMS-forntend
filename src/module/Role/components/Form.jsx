import React from 'react'
import { Link } from 'react-router-dom';
import { Form, Field } from 'formik';
import Select from 'react-select';

function Forms({ setIsUpdate,
    formik, setSelectedPermision, selectedPermision, setRole, isClearable, isSearchable, selectedValues,
}) {

    return (
        <>
            <div className="row">
                <div className="col-6">
                    <h3 className="m-0 title-h3">{setIsUpdate ? "Update Role" : "Add Role"}</h3>
                </div>
                <div className="col-6 text-right">
                    <Link to="/role" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Back
                    </Link>
                </div>
            </div>
            <hr className="my-3" />
            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <div className="user-form">
                        <Form>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="" className="block text-md font-medium leading-6 text-gray-900">Select Role :</label>
                                    <Field as="select" name="selectRole"
                                        onChange={(e) => {
                                            setRole(e.target.value)
                                            formik.setFieldValue("selectRole", e.target.value)
                                        }}

                                        //  value={formik.values.selectRole}  onChange={formik.handleChange}
                                        className='block border border-black px-2 py-2  rounded right-5 min-w-[200px] max-w-[300px]'>
                                        <option value="">Select Role</option>
                                        <option value="content_author">Content Author</option>
                                        <option value="admin">Admin</option>
                                    </Field>
                                    {formik.errors.selectRole && formik.touched.selectRole ? <p className='text-red-500'>{formik.errors.selectRole}</p>
                                        : null}

                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="username" className="block text-md font-medium leading-6 text-gray-900">
                                        Role Name :
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <Field type="text" name="role_name" className="form-control" id="role_name" placeholder="Enter role name" aria-label="role_name" />
                                        </div>
                                        {formik.errors.role_name && formik.touched.role_name ? <p className='text-red-500'>{formik.errors.role_name}</p>
                                            : null}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="username" className="block text-md font-medium leading-6 text-gray-900">
                                        Permissions :
                                    </label>
                                    <div className="mt-2">
                                        <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            value={selectedPermision} // Set the selected value
                                            onChange={(selectedOption) => {
                                                setSelectedPermision(selectedOption); // Update the selected role
                                            }}
                                            isMulti
                                            isClearable={isClearable}
                                            options={selectedValues}
                                            isSearchable={isSearchable}
                                            getOptionLabel={(option) => `${option.type} : ${option.module} `} // Function to render label
                                            getOptionValue={(option) => option.id} // Function to get the value of the selected option
                                            placeholder="Select Role"
                                        />

                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">{setIsUpdate ? "save" : "add role"}</button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Forms