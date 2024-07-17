import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import TurndownService from 'turndown';
import '../../../assets/css/choosefile.css'
import pb from '../../../Pocketbase/pocketbase';
import { toast } from 'react-toastify';
import axiosInstance from '../../../axiosInstance/axiosInstance'
import { IoIosClose } from 'react-icons/io';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as Yup from "yup"
import MDEditor from '@uiw/react-md-editor';
import parse from 'html-react-parser'
import Select from 'react-select';
import Swal from 'sweetalert2';



const initialvalues = {
  title: "",
  Lname: "",
  Sdescription: "",
  is_private: false,
  is_feature_post: false,
  language: "",
  metaArr: 0
}

export default function Update() {

  const redirect = useNavigate()

  const { id } = useParams()
  const [formData, setFormData] = useState(initialvalues)

  const [next, setNext] = useState(false) // previos and next func...
  //============ text editor states ===========
  const [content, setContent] = useState(''); // text editor content 
  const turndownService = new TurndownService(); // create markdownfile
  // ===========================================
  const [image, setImage] = useState("") // image state
  const [rowCount, setRowCount] = useState(formData?.Stmetadata?.length); // add new row in meta 
  const [selectedValues, setSelectedValues] = useState([]); // take value of catagories api filter store in array
  const [language, setLanguage] = useState([]) // take value of language form api 
  const [selectLan, setSelectLan] = useState("")

  const [Catagories, setCatagories] = useState(null);
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);

  // meta array 
  const [metaArr, setMetaArr] = useState()



  const [validation, setValidation] = useState({
    title: Yup.string().min(25).required('Title is required'),
    Sdescription: Yup.string().required('Description is required'),
    language: Yup.string().required('Language is required'),
    is_feature_post: Yup.boolean()

  })
  const stories = Yup.object().shape(validation)

  useEffect(() => { // fetch data for catagories
    fetchCatagories()
    fetchLanguage()
  }, [])

  useEffect(() => {
    if (next == true && id) {
      fetchMarkdownFile()
    }
  }, [next, id])

  useEffect(() => {
    fetchStory()
  }, [id])



  const fetchStory = async () => {
    try {
      const record = await pb.collection('New_Story_view').getOne(`${id}`, {
        expand: 'Sid,Cid,Lid',
      });

      const newmetaArr = [];
      const newvalidation = validation

      record.Stmetadata.map((item, index) => {
        newmetaArr.push(index)
        record[`title${index}`] = item['og:title'];
        record[`description${index}`] = item['og:description'];

        newvalidation[`title${index}`] = Yup.string().required('Meta Title is required');
        newvalidation[`description${index}`] = Yup.string().required('Meta description is required');
      })

      setValidation(newvalidation)
      setMetaArr(newmetaArr)
      setCatagories(record?.categoryDatas)
      setFormData(record)

    }
    catch (error) {
      throw error
    }
  }

  const fetchMarkdownFile = async () => {
    try {
      const markdownFetch = await fetch(`https://cms.3m3.in/api/files/New_Story_view/${id}/${formData?.content}`);
      const markdownText = await markdownFetch.text();
      setContent(markdownText)
    }
    catch (error) {
      console.log(error)
      throw error
    }
  }


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
    }
    catch (error) {
      console.log(error)
    }
  }

  const handelImage = (e) => {
    setImage(e.target.files[0]);
  }


  const addNewRow = (index, formik) => {
    setRowCount(index + 1);
    const newvalidation = validation
    formik.setFieldValue(`title${index + 1}`, "")
    formik.setFieldValue(`description${index + 1}`, "")

    setMetaArr(prev => [...prev, index + 1])

    newvalidation[`title${index + 1}`] = Yup.string().required('Meta Title is required');
    newvalidation[`description${index + 1}`] = Yup.string().required('Meta description is required');

  };

  const removeRow = (item, formik) => {
    // console.log("remove item : ", item)
    setMetaArr(prev => prev.filter((i, _) => i !== item));

    setValidation(prev => {
      const newValidation = { ...prev };
      delete newValidation[`title${item}`];
      delete newValidation[`description${item}`];
      return newValidation;
    })

    formik.setFieldValue(`meta_title${item}`, '');
    formik.setFieldValue(`meta_description${item}`, '');

    // console.log("formik new values", formik.values)
    return formik.values;

  }

  const handelSubmitStory = async (values) => {

    const newMetaData = metaArr.map((index) => (
      { 'og:title': values[`title${index}`], 'og:description': values[`description${index}`] }
    ))
    const metaDataString = JSON.stringify(newMetaData)

    try {
      if (!content) {
        toast.error("please write something in editor")
        return;
      }

      const postCatagories = Catagories.map(item => item.id)

      let imageData = new FormData();
      if (image) {
        imageData.append("image", image);
      }
      else {
        imageData.append("image", formData.avatar);

      }
      const avatar = imageData.get('image');
      //=======================
      const markdownContent = turndownService.turndown(content);
      const markdownBlob = new Blob([markdownContent], { type: 'text/markdown' });

      const response = await axiosInstance.patch('/story/update', {
        "title": values.title,
        "image": avatar,
        "status": "pending",
        "is_private": values.is_private,
        "slug": values.Stslug,
        "content": markdownBlob,
        "language_id": `${values.language}`,
        "pub_date": "",
        "is_feature_post": values.is_feature_post,
        "tag_ids": "",
        "is_deleted": values.is_deleted,
        "category_id": `[${postCatagories}]`,
        "metadata": metaDataString,
        "sid": values.Sid,
      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response?.status == 200) {
        Swal.fire({
          icon: 'success',
          title: `${response.data.msg}`,
        });
        redirect("/mystories")
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
    }

  }

  console.log("meta arr :", metaArr?.length)
  return (
    <>

      <div className="page-content">
        <div className="main-wrapper">
          <div className="story-form text-left">

            <Formik
              enableReinitialize
              initialValues={formData}
              validationSchema={stories}
              onSubmit={() => { }}>
              {
                (formik) => {
                  console.log("formik values", formik.values)

                  return <Form>

                    <div className="row align-items-end ">
                      <div className="col-sm-12 col-md-6 flex">
                        {
                          next == false ? null : <button className='btn' onClick={() => setNext(!next)}> <i class="fa-solid fa-arrow-left text-xl"></i></button>
                        }
                        <h3 className="mt-2 title-h3">Update Story</h3>
                      </div>
                      <div className="col-sm-12 col-md-6 text-right">
                        {
                          next == false ? null : (
                            <div className='flex justify-end'>
                              <button type="submit" onClick={() => handelSubmitStory(formik.values, formik)} className="btn btn-primary">Submit</button>
                              <Link to={"/mystories"} className="btn">Cancel</Link>
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
                                  <label htmlFor="username" className="block text-md font-medium leading-6 text-gray-900">
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
                                <label htmlFor="languageSelect" className="form-label">Select Language:</label>
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
                                  }} value={false} type="radio" id="Private" name="is_private" checked={!formik.values.is_private} />
                                  <label className="form-check-label" htmlFor="Private">
                                    Private
                                  </label>
                                </div>
                                <div className="form-check">
                                  <Field className="form-check-input" onChange={() => {
                                    formik.setFieldValue('is_private', true)
                                  }} type="radio" name="is_private" id="Public" value={true} checked={formik.values.is_private} />
                                  <label className="form-check-label" htmlFor="Public">
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
                                <label htmlFor="exampleFormControlFile1">Description : </label> <br />
                                <Field as="textarea"
                                  name="Sdescription" cols="60" rows="5" className='rounded-md mt-1' style={{ border: "1px solid gray", color: "black" }}></Field>
                              </div>
                              {formik.errors.Sdescription && formik.touched.Sdescription ? <p className='text-red-500'>{formik.errors.Sdescription}</p>
                                : null}
                            </div>
                          </div>
                          {/* == For Image ==== */}
                          <div className="row">
                            <div className="col-3 mt-3">
                              <label htmlFor="exampleFormControlFile1">Image :</label>
                              <div className="form-group flex mt-1">
                                <input type="file" onChange={handelImage} name='image' className="form-control-file mt-4" id="exampleFormControlFile1" />
                              </div>

                            </div>
                            <div className="col-3 mt-3" id='element-hide'>
                              <label htmlFor="Current">Current Image :</label>
                              <div className="form-group mt-1">
                                <span>
                                  <img id='Current' className='h-30 rounded-lg mt-3' src={`https://cms.3m3.in/api/files/${formData.collectionName}/${formData.id}/${formData.image}`} alt="no img found" />
                                  <button type='button' id='btn-hide' onClick={() => {
                                    formik.setFieldValue(`${formik.image}`, "")
                                    document.getElementById("element-hide").style.display = "none";
                                  }}>remove image</button>
                                </span>
                              </div>

                            </div>
                          </div>

                          {metaArr?.map((item, index) => (
                            // console.log("item", item)

                            <div key={index} className="row mt-5 mb-4" >
                              <div className="col-sm-12 col-md-4">
                                <div className="mb-4">
                                  <label htmlFor="title" className="form-label label-size">Meta Title :</label>
                                  <Field type="text" name={`title${item}`} className="form-control" placeholder="Story's Title" />
                                </div>
                                {formik.errors[`title${item}`] && formik.touched[`title${item}`] ? <p className='text-red-500'>{formik.errors[`title${item}`]}</p>
                                  : null}
                              </div>
                              <div className="col-sm-12 col-md-5">
                                <div className="mb-4">
                                  <label htmlFor="description" className="form-label label-size">Meta description :</label>
                                  <Field as="textarea" className="form-control" name={`description${item}`} placeholder='Enter meta description' rows={1} />
                                </div>
                                {formik.errors[`description${item}`] && formik.touched[`description${item}`] ? <p className='text-red-500'>{formik.errors[`description${item}`]}</p>
                                  : null}
                              </div>
                              <div className="col-sm-12 col-md-3 button-set">
                                {
                                  metaArr?.length === 1 ? "" : (
                                    <button className={`btn btn-danger`} type='button'
                                      onClick={() => removeRow(item, formik)}>
                                      <i className="fa-solid fa-xmark" />
                                    </button>
                                  )
                                  // index == 0 && metaArr?.length !== 1 ? <button className={`btn btn-danger`} type='button'
                                  //   onClick={() => removeRow(item, formik)}>
                                  //   <i className="fa-solid fa-xmark" />
                                  // </button> : null
                                }

                                {
                                  index == metaArr.length - 1 ? <button className='btn btn-success' onClick={() => addNewRow(index, formik)}>
                                    <i className="fa-solid fa-plus" />
                                  </button> : null
                                }

                              </div>
                            </div>
                          ))}

                          {/* // next button  */}
                          <div className="mb-3">
                            <button type='button'
                              onClick={async () => {
                                await formik.submitForm();
                                const errors = await formik.validateForm();
                                // console.log('submit', errors);
                                if (Object.keys(errors).length > 0) {
                                  return;
                                }
                                else if (!Catagories) {
                                  Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Please select categories!',
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

