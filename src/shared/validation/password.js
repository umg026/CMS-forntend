import * as Yup from 'yup'

export const password = Yup.object({
    old_password: Yup.string().required("this field is required"),
    new_password :Yup.string().min(5).max(10).required("Please Enter Your Password ") ,
    confirm_password :Yup.string().required("Please Enter Confirm Password")
    .oneOf([Yup.ref("new_password"), null], "Password Doesnt Match")
})