import Select from 'react-select';
import { Field, Form } from 'formik';
import React from 'react'

function Froms({ oldPass, setOldPass
    , newPassword, setNewPasword, update, setSelectedRole, formik, data, isSearchable, isClearable, selectedRole }) {



    return (
        <>
            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <div className="user-form">
                        <Form>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="Firstname" className="form-label">
                                        First name <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        name="Firstname"
                                        type="text"
                                        className="form-control"
                                        id="Firstname"
                                        placeholder="Enter your first name"
                                    />
                                    {formik.errors.Firstname && formik.touched.Firstname ? <p className='text-red-500'>{formik.errors.Firstname}</p>
                                        : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="Lastname" className="form-label">
                                        Last name <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        type="text"
                                        name="Lastname"
                                        className="form-control"
                                        id="Lastname"
                                        placeholder="Enter your last name"
                                    />
                                    {formik.errors.Lastname && formik.touched.Lastname ? <p className='text-red-500'>{formik.errors.Lastname}</p>
                                        : null}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="username" className="form-label">
                                        Username <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        id="username"
                                        autoComplete="username"
                                        placeholder="Enter your username"
                                    />
                                    {formik.errors.username && formik.touched.username ? <p className='text-red-500'>{formik.errors.username}</p>
                                        : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email address <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                    />
                                    {formik.errors.email && formik.touched.email ? <p className='text-red-500'>{formik.errors.email}</p>
                                        : null}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="website" className="form-label">
                                        website <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        name="website"
                                        type="url"
                                        className="form-control"
                                        placeholder="Enter your website"
                                    />
                                    {formik.errors.website && formik.touched.website ? <p className='text-red-500'>{formik.errors.website}</p>
                                        : null}
                                </div>
                                {
                                    update === false ? <div className="col-md-3 mb-3">
                                        <label htmlFor="password" className="form-label">
                                            Password <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Enter your password"
                                            autoComplete="current-password"
                                        />
                                        {formik.errors.password && formik.touched.password ? <p className='text-red-500'>{formik.errors.password}</p>
                                            : null}
                                    </div> : null
                                }

                                {/* ===========================  Role ================================================================= */}
                                <div className={update == false ? "col-md-3 mb-3 role" : "col-md-6 mb-3 role"}>

                                    <label htmlFor="content" className="form-label label-size">
                                        Role :
                                    </label>

                                    <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        value={selectedRole} // Set the selected value
                                        onChange={(selectedOption) => {
                                            setSelectedRole(selectedOption); // Update the selected role
                                        }}
                                        isClearable={isClearable}
                                        options={data}
                                        isSearchable={isSearchable}
                                        getOptionLabel={(option) => option.role_name} // Function to render label
                                        getOptionValue={(option) => option.id} // Function to get the value of the selected option
                                        placeholder="Select Role"
                                    />
                                </div>
                                {/* ============================================================================================ */}
                            </div>

                            {
                                update !== false ?
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="password" className="form-label">
                                                old Password <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="password"
                                                name="new_pass"
                                                value={oldPass}
                                                onChange={(e) => setOldPass(e.target.value)}
                                                className="form-control"
                                                id="oldpassword"
                                                placeholder="Enter Old password"
                                                autoComplete="current-password"
                                            />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="password" className="form-label">
                                                New Password <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="password"
                                                name="new_pass"
                                                value={newPassword}
                                                onChange={(e) => setNewPasword(e.target.value)}
                                                className="form-control"
                                                id="password"
                                                placeholder="Enter new password"
                                                autoComplete="current-password"
                                            />
                                        </div>
                                    </div> : null
                            }

                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Froms