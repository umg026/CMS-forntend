import * as Yup from 'yup'

export const validation = Yup.object({
    Firstname: Yup.string().required("please enter frist name"),
    Lastname: Yup.string().required("please enter last name"),
    website: Yup.string().required("please enter some url"),
    username: Yup.string().required("please enter user name"),
    email: Yup.string().required("please enter email"),
    // avatar: Yup.string().required("please enter avatar"),
    // password: Yup.string().required("please enter password"),
})