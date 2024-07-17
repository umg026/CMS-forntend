import * as Yup from 'yup'

export const user = Yup.object({
    username: Yup.string().min(2).max(20).required("please enter username"),
    Firstname: Yup.string().min(2).max(20).required("please enter fristname"),
    Lastname: Yup.string().min(2).max(20).required("please enter lastname"),
    website: Yup.string().required("please enter web-link"),
    email: Yup.string().email().required("please enter email"),
    password: Yup.string().min(5).max(15).required("please enter password"),
})