import React, { useEffect, useState } from 'react'
import { pb } from '../../../Pocketbase/pocketbase'
import { toast } from 'react-toastify'
import { Formik, Form, Field } from 'formik'
import { catagoriesCreate } from '../../../shared/validation/catagories'
import Forms from '../components/Forms'
import { useDispatch } from 'react-redux'
import { catagoriesData } from '../redux/thunk'
import Swal from 'sweetalert2'


function Update({ updateItem, setIsupdate }) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);
    const [formData, setformData] = useState({
        name: "",
        description: "",
        slug: ""
    })
    console.log("set Update Payload :", updateItem)

    useEffect(() => {
        if (updateItem) {
            setformData(updateItem)
            setLoading(false);
        }
    }, [updateItem])

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={formData}
                validationSchema={catagoriesCreate}
                onSubmit={async (value, action) => {
                    try {
                        await pb.collection('categories').update(`${updateItem.id}`, value);
                        setIsupdate(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Your Catagories Update Successfully...',
                        });
                        action.resetForm()
                        dispatch(catagoriesData(1, 9))

                    }
                    catch (error) {
                        throw error;
                    }
                }}
            >
                {formik => {
                    return <Forms formik={formik} setIsupdate={setIsupdate} />
                }}
            </Formik>

        </>
    )
}

export default Update