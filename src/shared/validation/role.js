import * as Yup from "yup"

export const roleSchema = Yup.object({
    selectRole: Yup.string().required("Please select role"),
    role_name: Yup.string().min(2).max(15).required("Please Enter role name"),
})