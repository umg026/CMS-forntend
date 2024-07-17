// import * as Yup from "yup"

// export const stories = Yup.object({
//     title: Yup.string().min(2).max(20).required("please enter title"),
//     description: Yup.string().min(10).max(10000).required("please enter description"),
//     is_private: Yup.string().required("please select visibility"),
//     is_feature_post: Yup.string().required("please select this field"),
//     meta_title: Yup.string().required("please enter meta titile"),
//     meta_description: Yup.string().required("please enter description"),
//     language: Yup.string().required("please select the language"),

// })

import * as Yup from "yup"

// const metaSchema = Yup.object().shape({
//     meta_title: Yup.string().required('Meta Title is required'),
//     meta_description: Yup.string().required('Meta Description is required'),
//   });
  
  // Update the validation schema to include the meta fields
 export const stories = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    language: Yup.string().required('Language is required'),
    visibility: Yup.string().required('Visibility is required'),
    is_feature_post: Yup.boolean(),

    // metadata: Yup.array().of(metaSchema),



    title0: Yup.string().required('Meta Title is required'),
    description0: Yup.string().required('Meta Description is required'),
  });