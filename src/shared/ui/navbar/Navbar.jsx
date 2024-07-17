import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../../../module/login/redux/userSlicer'
import Sidebar from './Sidebar';
import '../../../assets/css/main.min.css'
import pb from '../../../Pocketbase/pocketbase'


function Navbar() {
    const [data, setData] = useState(null);
    const [sidebar, setSidebar] = useState(true)
    const location = useLocation()

    const [marginLeft, setMarginLeft] = useState(260);
    const [image, setImage] = useState("")
    const [permission, setPermission] = useState(null)

    useEffect(() => {
        const permison_user = JSON.parse(localStorage.getItem("userData"))
        // console.log("permissions :", permison_user)
        setPermission(permison_user)

        const localStorageData = localStorage.getItem("pocketbase_auth");

        if (localStorageData) {
            const parsedData = JSON.parse(localStorageData);
            setData(parsedData);
        }
    }, []);

    useEffect(() => {
        if (data?.model?.id) {

            fetchImage()
        }
    }, [data?.model?.id])

    const fetchImage = async () => {
        try {
            const record = await pb.collection('users').getOne(`${data?.model?.id}`);
            setImage(record)
        }
        catch (error) {
            throw error
        }
    }

    // LOGOUT Functionalities
    const redirect = useNavigate()
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('pocketbase_auth');
        redirect("/login")
    };
    const handleSidebarToggle = () => {
        setSidebar(!sidebar);
        setMarginLeft(sidebar ? 0 : 260); 
    }



    return (
        <>
            <div className="page-container">
                <div className="page-header">
                    <nav className="navbar navbar-expand-lg d-flex justify-content-between">
                        <div className id="navbarNav">
                            <ul className="navbar-nav" id="leftNav">
                                <li className="nav-item">
                                    <a className="nav-link" id="sidebar-toggle" onClick={handleSidebarToggle}>
                                        <i className="fa-solid fa-bars"></i>
                                    </a>
                                </li>
                                <li>
                                    <button className="btn btn-light off-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLeft" aria-controls="offcanvasLeft"><i className="fa-solid fa-bars"></i></button>
                                    <div className="offcanvas offcanvas-start ocv" tabIndex={-1} id="offcanvasLeft" aria-labelledby="offcanvasLeftLabel">
                                        <div className="offcanvas-header">
                                            <h5 className="offcanvas-title" id="offcanvasLeftLabel">{permission?.role_type == "admin" ? "Hellow! Admin" : "Hellow! Author"}</h5>
                                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
                                        </div>
                                        <div className="offcanvas-body">
                                            <nav className="vertical-menu-wrapper">
                                                <ul className="vertical-menu">
                                                    <li className={location.pathname === '/' ? 'active-page' : ''} data-bs-dismiss="offcanvas">
                                                        <Link to="/" style={{ display: "flex", gap: "10px" }}>
                                                            <div className='py-2'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                                            </div>
                                                            <div className='mt-2 px-1'>
                                                                Dashboard
                                                            </div>
                                                        </Link>
                                                    </li>
                                                    {
                                                        permission?.role_type == "admin" ? (
                                                            <React.Fragment>
                                                                <li className={location.pathname === '/stories' ? 'active-page' : ''} data-bs-dismiss="offcanvas">
                                                                    <Link to="/stories" style={{ display: "flex", gap: "10px" }}>
                                                                        <div className='py-2'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-inbox"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg></div>
                                                                        <div className='mt-1 px-1'>All Stories</div>
                                                                    </Link>
                                                                </li>
                                                                <li className={location.pathname === '/users' ? 'active-page' : ''} data-bs-dismiss="offcanvas">
                                                                    <Link to="/users" style={{ display: "flex", gap: "10px" }}>
                                                                        <div className='py-2'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>
                                                                        <div className='mt-1 px-1'>Users</div>
                                                                    </Link>
                                                                </li>

                                                                <li className={location.pathname === '/role' ? 'active-page' : ''} data-bs-dismiss="offcanvas">
                                                                    <Link to="/role" style={{ display: "flex", gap: "10px" }}>
                                                                        <div className='py-2'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></div>
                                                                        <div className='mt-1 px-1'>Role</div>
                                                                    </Link>
                                                                </li>
                                                            </React.Fragment>
                                                        ) : null
                                                    }
                                                    {
                                                        permission?.role_type == "content_author" ? (
                                                            <React.Fragment>
                                                                <li className={location.pathname === '/stories/create' ? 'active-page' : ''} data-bs-dismiss="offcanvas">
                                                                    <Link to="/stories/create" style={{ display: "flex", gap: "10px" }}>
                                                                        <div className='py-2'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-inbox"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg></div>
                                                                        <div className='mt-1 px-1'>Add Stories</div>
                                                                    </Link>
                                                                </li>
                                                                <li className={location.pathname === '/mystories' ? 'active-page' : ''} data-bs-dismiss="offcanvas">
                                                                    <Link to="/mystories" style={{ display: "flex", gap: "10px" }}>
                                                                        <div className='py-2'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-inbox"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg></div>
                                                                        <div className='mt-1 px-1'>All stories</div>
                                                                    </Link>
                                                                </li>
                                                            </React.Fragment>
                                                        ) : null
                                                    }
                                                    <li className={location.pathname === '/catagories' ? 'active-page' : ''} data-bs-dismiss="offcanvas">
                                                        <Link to="/catagories" style={{ display: "flex", gap: "10px" }}>
                                                            <div className='py-2'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></div>
                                                            <div className='mt-1 px-1'>Catagories</div>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div id="headerNav">
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a className="nav-link search-dropdown" href="#" id="searchDropDown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i data-feather="search" /></a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link profile-dropdown" href="#" id="profileDropDown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {data && data.model && (
                                            <img className='rounded-full'
                                                src={data?.model?.id ? `https://cms.3m3.in/api/files/_pb_users_auth_/${image?.id}/${image?.avatar}` : "data:image/png;base64,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"}
                                                alt='no img' />
                                        )}
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end profile-drop-menu" aria-labelledby="profileDropDown">
                                        <Link className="dropdown-item" to="/profile"><i data-feather="user" />Profile</Link>
                                        <div className="dropdown-divider" />
                                        <a className="dropdown-item" href="#"><i data-feather="settings" />Settings</a>
                                        <a className="dropdown-item cursor-pointer" onClick={handleLogout}><i data-feather="log-out" />Logout</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>


                {sidebar && <Sidebar setSidebar={setSidebar} />}

                <style>{`
.page-content {
    margin-top: 71px;
    margin-left: ${marginLeft}px;
    -webkit-transition: all .2s ease-in-out;
    -moz-transition: all .2s ease-in-out;
    -o-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
}

@media (min-width: 320px) and (max-width: 480px) {
    .page-content {
        margin-left: 20px;
    }
}

@media (min-width: 481px) and (max-width: 769px) {
    .page-content {
        margin-left: 20px;
    }
}

@media (min-width: 770px) and (max-width: 1290px) {
    .page-content {
       margin-left: ${marginLeft}px; 
    }
    .off-btn {
        display: block;
    }
    .ocv{
        display: block;
    }
     .nav-link {
        display: none;
    }
}

@media (min-width: 1201px) and (max-width: 1600px) {
    .page-content {
       margin-left: ${marginLeft}px; 
    }

    .off-btn {
        display: none;
    }
}
    

`}</style>
            </div>

        </>
    )
}

export default Navbar;