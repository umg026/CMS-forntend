import { Field, Form } from 'formik'
import React from 'react'

function Forms({ formik, setIsupdate }) {
    return (
        <>
            <Form>
                <div className="mb-3 pt-3">
                    <label htmlFor="name" className="form-label label-size">Name</label>
                    <Field type="text" name="name" className="form-control" id="name" placeholder="Enter catagories name" aria-label="name" />
                    <p className="form-text">The name is how it appears on your site.</p>
                    {formik.errors.name && formik.touched.name ? <p className='text-red-500'>{formik.errors.name}</p>
                        : null}

                </div>
                <div className="mb-3">
                    <label htmlFor="slug" className="form-label label-size">Slug</label>
                    <Field type="text" name="slug" className="form-control" id="slug" placeholder="Enter slug name" aria-label="slug" />
                    <p className="form-text">The "slug" is the URL-friendly version of the name. It is usually
                        all lowercase and contains only letters, numbers, and hyphens.</p>
                    {formik.errors.slug && formik.touched.slug ? <p className='text-red-500'>{formik.errors.slug}</p>
                        : null}

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label label-size">Description</label>
                    <Field name="description" component="textarea" placeholder="Enter your text here" className="form-control" />
                    <p className="form-text">The description is not prominent by default; however, some themes
                        may show it.</p>
                    {formik.errors.description && formik.touched.description ? <p className='text-red-500'>{formik.errors.description}</p>
                        : null}
                </div>

                <div className="d-flex">
                    <button type="submit" className="btn btn-primary">Save</button>
                    {
                        setIsupdate ? <button onClick={() => setIsupdate(false)} className='text-black p-2 px-4 text-base'>Back</button> : ""
                    }
                </div>
            </Form>

        </>
    )
}

export default Forms