import * as Yup from "yup"

export const catagoriesCreate = Yup.object({
    name: Yup.string().min(2).max(15).required("Please Enter catagories name"),
    slug: Yup.string().min(2).max(15).required("Please Enter slug"),
    description: Yup.string().min(2).required("Please Enter description"),

})