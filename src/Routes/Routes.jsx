import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from '../shared/ui/layout/Layout';
import Adashboard from "../module/Dashboard/admin/Dashboard";
import Cdashboard from "../module/Dashboard/content/Dashboard";
import Stories from "../module/Stories/container/Stories";
import Login from '../module/login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../module/login/redux/userSlicer';
import Admin_profile from '../module/admin profile/Admin_profile';
import Profile_edit from '../module/admin profile/Profile_edit';
import UserCreate from '../module/User/container/Create';
import UserUpdate from '../module/User/container/Update';
import { ToastContainer } from 'react-toastify';
import PreviewStory from '../module/Stories/container/PreviewStory';
import Role_create from '../module/Role/container/Create';
import Role_update from '../module/Role/container/Update';
import Passowrd_change from '../module/admin profile/Passowrd_change';
import Catagories from '../module/catagories/container/Catagories';
import Create from '../module/catagories/container/Create';
import Update from '../module/catagories/container/Update';
import Story_Create from '../module/Stories/components/Create';
import Mystories from '../module/Stories/container/Mystories';
import UpdateStory from '../module/Stories/components/Update';
import Container from '../module/Role/container/container';
import User from '../module/User/container/Container';
import useDetails from '../shared/ui/permission/useDetails';


function Routess() {

    const { isLoggedIn } = useSelector(state => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('pocketbase_auth'))

        if (storedUser) {
            dispatch(login(storedUser))
        }

    }, [dispatch])

    const { role } = useDetails()


    return (
        <BrowserRouter basename='/admin'>
            <ToastContainer />
            {!isLoggedIn && !localStorage.getItem("pocketbase_auth") && <Navigate to="/login" replace />}


            <Routes>
                {!isLoggedIn && !localStorage.getItem("pocketbase_auth") ? (
                    <Route path="/login" element={<Login />} />
                ) : (
                    <Route path="/" element={<Layout />}>
                        {
                            role === "admin" ? <Route index element={<Adashboard />} /> : <Route index element={<Cdashboard />} />
                        }
                        {/* <Route index element={role == "admin" ? <Adashboard /> : <Cdashboard />} /> */}
                        {/* stories  */}
                        <Route path="stories" element={<Stories />} />
                        <Route path="stories/create" element={<Story_Create />} />
                        <Route path="mystories" element={< Mystories />} />
                        <Route path="stories/edit/:id" element={<UpdateStory />} />

                        <Route path="stories/preview/:id" element={<PreviewStory />} />

                        {/* Role  */}
                        <Route path="role" element={<Container />} />
                        <Route path="role/create" element={<Role_create />} />
                        <Route path="role/edit/:id" element={<Role_update />} />
                        {/* users  */}

                        <Route path="users" element={<User />} />
                        <Route path="users/create" element={<UserCreate />} />
                        <Route path="users/edit/:id" element={<UserUpdate />} />

                        {/* admin profile  */}
                        <Route path="/profile" element={<Admin_profile />} />
                        <Route path="admin/profile/change_password/:id" element={<Passowrd_change />} />
                        <Route path="/profile/edit/:id" element={<Profile_edit />} />
                        {/* <Route path="permission/create" element={<Permission_create />} /> */}
                        {/* catagories  */}
                        <Route path="catagories" element={<Catagories />} />
                        <Route path="catagories/create" element={<Create />} />
                        <Route path="catagories/edit/:id" element={<Update />} />
                    </Route>
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default Routess;
