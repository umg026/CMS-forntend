import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../login/redux/userSlicer';
import '../../assets/css/custom.css'
import axiosInstance from '../../axiosInstance/axiosInstance';

function Admin_profile() {
  const dispatch = useDispatch()
  const redirect = useNavigate()
  const [data, setData] = useState(null);

  const [id, setId] = useState("")

  useEffect(() => {
    const localStorageData = localStorage.getItem("pocketbase_auth");
    //
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      setId(parsedData.model.id)

    }
  }, []);


  useEffect(() => {
    if (id) {
      dataItem()
    }
  }, [id])

  const dataItem = async () => {
    try {
      const record = await axiosInstance.get(`/api/collections/user_view/records/${id}`);
      setData(record?.data)
    }
    catch (error) {
      console.log(error)

    }
  }

  if (!data) {
    return <h1>Loading......</h1>
  }

  // for logout functionalities 
  const handelLogout = () => {
    dispatch(logout())
    redirect("/login")

  }

  return (
    <>

      <div className="page-content">
        <div className="main-wrapper">
          <div className="user-profile-main">
            <div className="row">
              <div className="col-12">
                <h3 className="title-h3 m-0">Your Profile</h3>
                <hr />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="profile-card">
                  <div className="profile-picture">
                    <img
                      className='rounded-full'
                      src={data?.avatar !== "" ? `https://cms.3m3.in/api/files/_pb_users_auth_/${data?.id}/${data?.avatar}` : "data:image/png;base64,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"}
                      alt="Profile Picture" />
                  </div>
                  <div className="profile-info">
                    <h2>{`${data?.Firstname} ${data?.Lastname}`}</h2>
                    <p>Email: {`${data?.email}`}</p>
                    <p>Role: {data?.role_type}</p>
                    <p>Joined: January 1, 2022</p>
                    <Link to={`/profile/edit/${data?.id}`} className="btn btn-info mx-2 my-2">Edit Profile</Link>
                    <button onClick={handelLogout} className="btn btn-danger mx-2 my-2">Log out</button>
                  </div>
                </div>
              </div>
              <div className="col-md-8 my-md-0 my-sm-5">
                <form>
                  <div className="mb-3 mt-3">
                    <label htmlFor="firstname" className="form-label">First Name:</label>
                    <input type="text" className="form-control border-none" id="firstname" defaultValue={data?.Firstname} disabled />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">Last Name:</label>
                    <input type="text" className="form-control border-none" id="lastname" name="lastname" defaultValue={data?.Lastname} disabled />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input type="text" className="form-control border-none" id="username" name="username" defaultValue={data?.username} disabled />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control border-none" id="email" name="email" defaultValue={data?.email} disabled />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="website" className="form-label">Website:</label>
                    <input type="text" className="form-control border-none" id="website" name="website" defaultValue={data?.website} disabled />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role:</label>
                    <input type="text" className="form-control border-none" id="role" name="role" defaultValue={data?.role_type} disabled />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Admin_profile