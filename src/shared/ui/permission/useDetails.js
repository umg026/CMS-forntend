import { useEffect, useState } from 'react'

export default function useDetails() {

  const [data, setData] = useState(null)
  const [permission, setPermission] = useState(null)
  const [role, setRole] = useState(null)
// console.log("permission", permission)
  useEffect(() => {
    fetchLocals()
  }, [])

  const fetchLocals = async () => {
    const getdata = await JSON.parse(localStorage.getItem("userData"))
    // console.log(getdata)
    setData(getdata)
    setRole(getdata?.role_type)
    setPermission(getdata?.all_module_permissions)
  }

  return { data, permission, role }
}
