import React, { useState, useRef, useMemo, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import TurndownService from 'turndown';
import '../../../assets/css/choosefile.css'
import pb from '../../../Pocketbase/pocketbase';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axiosInstance from '../../../axiosInstance/axiosInstance'
import * as Yup from 'yup'
import Swal from "sweetalert2";
import Select from 'react-select';

const initialvalues = {
  title: "",
  Lname: "",
  Sdescription: "",
  is_private: false,
  meta_title: "",
  meta_description: "",
  is_feature_post: false,
  language: "",
  metaArr: 0
}

export default function Story_Create() {

  const [next, setNext] = useState(false) // previos and next func...
  const [content, setContent] = useState(''); // text editor content 
  const turndownService = new TurndownService(); // create markdownfile

  const [image, setImage] = useState("") // image state
  const [rowCount, setRowCount] = useState(0); // add new row in meta 

  const [selectedValues, setSelectedValues] = useState([]); // take value of catagories api filter store in array
  const [language, setLanguage] = useState(null) // take value of language form api 
  const [selectLan, setSelectLan] = useState("")

  const [Catagories, setCatagories] = useState(null);
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);



  // meta array 
  const [metaArr, setMetaArr] = useState([])

  const [validation, setValidation] = useState({
    title: Yup.string().min(25).required('Title is required'),
    meta_title: Yup.string().required('meta title is required'),
    meta_description: Yup.string().required('meta description is required'),
    Sdescription: Yup.string().required('Description is required'),
    language: Yup.string().required('Language is required'),
    is_feature_post: Yup.boolean()

  })
  const stories = Yup.object().shape(validation)


  useEffect(() => { // fetch data for catagories
    fetchCatagories()
    fetchLanguage()
  }, [])

  const fetchCatagories = async () => {
    try {
      const record = await pb.collection('categories').getFullList()
      setSelectedValues(record)
    }
    catch (error) {
      throw error
    }
  }
  // fetch catagories 
  const fetchLanguage = async () => {
    try {
      const record = await pb.collection('languages').getFullList();
      setLanguage(record)
      // console.log(record)
    }
    catch (error) {
      console.log(error)
    }
  }

  const handelImage = (e) => {
    // console.log("Image selected:", e.target.files[0]);
    setImage(e.target.files[0]);
  }

  const addNewRow = (formik) => {
    setRowCount(prevCount => prevCount + 1);

    formik.setFieldValue(`meta_title${rowCount + 1}`, "")
    formik.setFieldValue(`meta_description${rowCount + 1}`, "")

    // console.log("add row initialvalue", newwww)
    const newValidation = { ...validation };

    newValidation[`meta_title${rowCount + 1}`] = Yup.string().required(`Meta Title is required${rowCount + 1}`);
    newValidation[`meta_description${rowCount + 1}`] = Yup.string().required(`Meta description is required${rowCount + 1}`);

    setValidation(newValidation);
    setMetaArr(prevArr => [...prevArr, rowCount + 1]);
  };

  // =========================================================================

  const removeRow = (item, formik) => {
    // console.log("remove row item", item)

    setMetaArr(prev => prev.filter((i, _) => i !== item));

    setValidation(prev => {
      const newValidation = { ...prev };
      delete newValidation[`meta_title${item}`];
      delete newValidation[`meta_description${item}`];
      return newValidation;
    })

    formik.setFieldValue(`meta_title${item}`, '');
    formik.setFieldValue(`meta_description${item}`, '');

    // console.log("formik new values", formik.values)
    return formik.values;

  }

  const handelSubmitStory = async (values, formik) => {

    const newMetaData = metaArr?.map((index, item) => (
      { 'og:title': values[`meta_title${index}`], 'og:description': values[`meta_description${index}`] }
    ))

    const prevMetaData = { "og:title": values.meta_title, "og:description": values.meta_description }
    newMetaData.push(prevMetaData)

    const metaDataString = JSON.stringify(newMetaData)

    try {
      if (!content) {
        toast.error("please write something in editor")
        return;
      }
      const postCatagories = Catagories?.map(item => item.id)

      let imageData = new FormData(); // this object for image handeling 
      imageData.append("image", image);
      const avatar = imageData.get('image');
      //=======================
      const markdownContent = turndownService.turndown(content);
      const markdownBlob = new Blob([markdownContent], { type: 'text/markdown' });

      const response = await axiosInstance.post('/story/create', {
        ...values,
        "image": avatar,
        "status": "pending",
        "title_lang": selectLan,
        "content": markdownBlob,
        "language_id": selectLan,
        "category_id": `[${postCatagories}]`,
        "metadata": metaDataString,
        "description": values.Sdescription

      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response?.status == 200) {
        Swal.fire({
          icon: 'success',
          title: 'Your Story Create Successfully...',
        });
        // toast.success("story create successfully")
        formik.resetForm();
        setNext(false)
        setCatagories("")
        setMetaArr([])
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'something went wrong!',
        });
      }
    }
    catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.response?.data?.msg}`,
      });
      // toast.error(`${error.response?.data?.msg}`)
    }
  }

  const handelCancelStory = async (values, formik) => {

    const newMetaData = metaArr.map((index, item) => (
      { 'og:title': values[`meta_title${index}`], 'og:description': values[`meta_description${index}`] }
    ))

    const prevMetaData = { "og:title": values.meta_title, "og:description": values.meta_description }
    newMetaData.push(prevMetaData)

    const metaDataString = JSON.stringify(newMetaData)

    try {

      const postCatagories = Catagories.map(item => item.id)

      let imageData = new FormData(); // this object for image handeling 
      imageData.append("image", image);
      const avatar = imageData.get('image');
      //=======================
      const markdownContent = turndownService.turndown(content);
      const markdownBlob = new Blob([markdownContent], { type: 'text/markdown' });
      // console.log(values)

      const response = await axiosInstance.post('/story/create', {
        ...values,
        "image": avatar,
        "status": "draft",
        "content": markdownBlob,
        "language_id": selectLan,
        "category_id": `[${postCatagories}]`,
        "metadata": metaDataString,
        "description": values.Sdescription

      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("response", response)
      Swal.fire({
        icon: 'success',
        title: 'Going On...',
        text: `Your Story Has Been Saved As Draft`,
      });
      setNext(false)
      formik.resetForm()
      setCatagories("")
      setMetaArr([])
    }
    catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.response?.data?.msg}`,
      });
    }
  }


  return (
    <>

      <div className="page-content">
        <div className="main-wrapper">
          <div className="story-form text-left">
            <Formik
              initialValues={initialvalues}
              validationSchema={stories}
              onSubmit={() => { }}>
              {
                (formik) => {
                  return <Form>
                    <div className="row align-items-end ">
                      <div className="col-sm-12 col-md-6 flex">
                        {
                          next == false ? null : <button className='btn' onClick={() => setNext(!next)}> <i className="fa-solid fa-arrow-left text-xl"></i></button>
                        }
                        <h3 className="mt-2 title-h3">Add Story</h3>
                      </div>
                      <div className="col-sm-12 col-md-6 text-right">
                        {
                          next == false ? null : (
                            <div className='flex justify-end'>
                              <button type="submit" onClick={() => handelSubmitStory(formik.values, formik)} className="btn btn-primary">Submit</button>
                              <button type="submit" onClick={() => handelCancelStory(formik.values, formik)} className="btn">Cancel</button>
                            </div>

                          )
                        }
                      </div>
                      <hr className="my-3" />
                    </div>
                    {
                      !next ?
                        <>
                          <div className="row pt-3">
                            <div className="col-sm-12 col-md-6 col-12">
                              <div className="mb-4">
                                <label htmlFor="title" className="form-label label-size">Title :</label>
                                <Field type="text" name="title" className="form-control" placeholder="Story's Title" />
                                {formik.errors.title && formik.touched.title ? <p className='text-red-500'>{formik.errors.title}</p>
                                  : null}
                              </div>
                            </div>
                            {/* ============= Catagories section==================== */}
                            <div className="col-sm-12 col-md-12 col-12">
                              <div className="row">
                                <div className="col-md-6 mb-3">
                                  <label htmlFor="username" className="form-label label-size">
                                    Catagories :
                                  </label>
                                  <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    value={Catagories} // Set the selected value
                                    onChange={(selectedOption) => {
                                      setCatagories(selectedOption); // Update the selected role
                                    }}
                                    isMulti
                                    isClearable={isClearable}
                                    options={selectedValues}
                                    isSearchable={isSearchable}
                                    getOptionLabel={(option) => option.name} // Function to render label
                                    getOptionValue={(option) => option.id} // Function to get the value of the selected option
                                    placeholder="Select Catagories"
                                  />

                                </div>
                              </div>
                            </div>
                          </div>
                          {/* ====== Language =========== */}
                          <div className="row align-items-center pt-3">
                            <div className="col-md-6 col-sm-12 ">
                              <div className="mb-3 lang-border">
                                <label htmlFor="languageSelect" className="form-label label-size">Select Language:</label>
                                <Field as="select" className="form-select" name="language"
                                  onChange={(e) => {
                                    setSelectLan(e.target.value)
                                    formik.setFieldValue("language", e.target.value)
                                  }}>
                                  <option value="">select language</option>
                                  {
                                    language && language?.map((item, index) => {
                                      return <option key={index} value={item.id}>{item.name}</option>
                                    })
                                  }
                                </Field>
                                {formik.errors.language && formik.touched.language ? <p className='text-red-500'>{formik.errors.language}</p>
                                  : null}
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-3 ">
                              <label htmlFor="visible" className="form-label label-size">Visibility :</label>
                              <div className="form-flex d-flex align-items-center gap-4 ">
                                <div className="form-check">
                                  <Field className="form-check-input" onChange={() => {
                                    formik.setFieldValue('is_private', false)
                                  }} value={false} type="radio" id="isprivate" name="is_private" checked={!formik.values.is_private} />
                                  <label className="form-check-label" htmlFor="isprivate">
                                    Private
                                  </label>
                                </div>
                                <div className="form-check">
                                  <Field className="form-check-input" onChange={() => {
                                    formik.setFieldValue('is_private', true)
                                  }} type="radio" name="is_private" id="isprivate" value={true} checked={formik.values.is_private} />
                                  <label className="form-check-label" htmlFor="isprivate">
                                    Public
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-3">
                              <div className="form-group">
                                <label htmlFor="checkboxId" className="label-size">Do you want to?</label>
                                <div className="form-check">
                                  <Field className="form-check-input" onChange={(e) => {
                                    formik.setFieldValue('is_feature_post', e.target.checked);
                                  }}
                                    checked={formik.values.is_feature_post} name='is_feature_post' type="checkbox" id="checkboxId" />

                                  <label className="form-check-label label-size" htmlFor="checkboxId">Feature Post</label>
                                </div>
                              </div>
                              {formik.errors.is_feature_post && formik.touched.is_feature_post ? <p className='text-red-500'>{formik.errors.is_feature_post}</p>
                                : null}
                            </div>
                          </div>
                          {/* ======= Description =========== */}
                          <div className="row">
                            <div className="col-12">
                              <div className="form-group">
                                <label htmlFor="exampleFormControlFile1" className='form-label label-size'>Description : </label> <br />
                                <Field as="textarea"
                                  name="Sdescription" cols="60" rows="5" className='rounded-md mt-1' style={{ border: "1px solid gray", color: "black" }}></Field>
                              </div>
                              {formik.errors.Sdescription && formik.touched.Sdescription ? <p className='text-red-500'>{formik.errors.Sdescription}</p>
                                : null}
                            </div>
                          </div>
                          {/* == For Image ==== */}
                          <div className="row">
                            <div className="col-6 mt-3">
                              <label htmlFor="exampleFormControlFile1" className='form-label label-size'>Image :</label>
                              <div className="form-group flex ">
                                <input type="file" onChange={handelImage} name='image' className="form-control-file mt-2" id="exampleFormControlFile1" required />
                              </div>

                            </div>
                          </div>
                          {/* ========================Meta data======================================================= */}
                          <div className="row mt-5 mb-4">
                            <div className="col-sm-12 col-md-4">
                              <div className="mb-4">
                                <label htmlFor="title" className="form-label label-size">Meta Title :</label>
                                <Field type="text" name={`meta_title`} className="form-control" placeholder="Story's Title" />
                              </div>
                              <ErrorMessage name={`meta_title`} className='text-red-500' />
                            </div>
                            <div className="col-sm-12 col-md-5">
                              <div className="mb-4">
                                <label htmlFor="description" className="form-label label-size">Meta description :</label>
                                <Field as="textarea" className="form-control" name={`meta_description`} placeholder='Enter meta description' rows={1} />
                              </div>
                              <ErrorMessage name={`meta_description`} className='text-red-500' />
                            </div>
                            <div className="col-sm-12 col-md-3 button-set">
                              <button className="btn btn-success" type='button'
                                onClick={() => addNewRow(formik)}>
                                <i className="fa-solid fa-plus" />
                              </button>
                            </div>
                          </div>
                          {/* ================ Add new values ================================================== */}
                          {metaArr?.map((item, index) => {

                            return <div key={index} className="row mt-5 mb-4">
                              <div className="col-sm-12 col-md-4">
                                <div className="mb-4">
                                  <label htmlFor="title" className="form-label label-size">Meta Title :</label>
                                  <Field type="text" name={`meta_title${item}`} className="form-control" placeholder="Story's Title" />
                                </div>
                                {formik.errors[`meta_title${item}`] && formik.touched[`meta_title${item}`] ? <p className='text-red-500'>{formik.errors[`meta_title${item}`]}</p>
                                  : null}
                              </div>
                              <div id={item} className="col-sm-12 col-md-5">
                                <div className="mb-4">
                                  <label htmlFor="description" className="form-label label-size">Meta description :</label>
                                  <Field as="textarea" className="form-control" name={`meta_description${item}`} placeholder='Enter meta description' rows={1} />
                                </div>
                                {formik.errors[`meta_description${item}`] && formik.touched[`meta_description${item}`] ? <p className='text-red-500'>{formik.errors[`meta_description${item}`]}</p>
                                  : null}

                              </div>
                              <div className="col-sm-12 col-md-3 button-set">
                                <button className="btn btn-danger" type='button'
                                  onClick={() => removeRow(item, formik)} >
                                  <i className="fa-solid fa-xmark" />
                                </button>
                              </div>
                            </div>
                          })}

                          {/*==================== // next button ================================== */}
                          <div className="mb-3">
                            <button type='button'
                              onClick={async () => {
                                await formik.submitForm();
                                const errors = await formik.validateForm();
                                // console.log('submit', errors);
                                if (Object.keys(errors).length > 0) {
                                  return;
                                }
                                else if (Catagories == null) {
                                  Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Please select categories!',
                                  });
                                  return
                                }
                                else if (!image) {
                                  Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Please select an image!',
                                  });
                                  return
                                }

                                setNext(true);
                                return;
                              }}
                              className="btn btn-primary">Next <i className="fa-solid fa-arrow-right" /></button>
                          </div>
                        </>
                        :
                        <>
                          <div className="row pt-3">
                            <div className="col-12 h-screen">
                              <MDEditor
                                height={"100%"}
                                value={content}
                                onChange={setContent}
                              />
                            </div>
                          </div>
                        </>
                    }

                  </Form>

                }
              }
            </Formik>

          </div>
        </div>
      </div >

    </>
  )
}
