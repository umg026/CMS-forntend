import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar({ setSidebar }) {
    // console.log(setSidebar)
    const location = useLocation()

    const [permission, setPermission] = useState(null)
    useEffect(() => {
        const permison_user = JSON.parse(localStorage.getItem("userData"))
        setPermission(permison_user)
    }, [])

    return (
        <>

            <div className="page-sidebar" style={{ transition: "ease" }}>
                <ul className="list-unstyled accordion-menu">
                    <li className="sidebar-title">
                        Author
                    </li>
                    <li className={location.pathname === '/' ? 'active-page' : ''}>
                        <Link to="/" style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
                            <div className='py-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                            </div>
                            <div className='-mt-1 px-2'>
                                Dashboard
                            </div>
                        </Link>
                    </li>
                    {
                        permission?.role_type == "admin" ? (
                            <React.Fragment>
                                <li className={location.pathname === '/stories' ? 'active-page' : ''}>
                                    <Link to="/stories" style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
                                        <div className='py-2'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-inbox"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg></div>
                                        <div className='-mt-1 px-2'>All Stories</div>
                                    </Link>
                                </li>
                                <li className={location.pathname === '/users' ? 'active-page' : ''}>
                                    <Link to="/users" style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
                                        <div className='py-2'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>
                                        <div className='-mt-1 px-2'>Users</div>
                                    </Link>
                                </li>

                                <li className={location.pathname === '/role' ? 'active-page' : ''}>
                                    <Link to="/role" style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
                                        <div className='py-2'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></div>
                                        <div className='-mt-1 px-2'>Role</div>
                                    </Link>
                                </li>
                            </React.Fragment>
                        ) : null
                    }
                    {
                        permission?.role_type == "content_author"  ? (
                            <React.Fragment>
                                <li className={location.pathname === '/stories/create' ? 'active-page' : ''}>
                                    <Link to="/stories/create" style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
                                        <div className='py-2'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-inbox"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg></div>
                                        <div className='-mt-1 px-2'>Add Stories</div>
                                    </Link>
                                </li>
                                <li className={location.pathname === '/mystories' ? 'active-page' : ''}>
                                    <Link to="/mystories" style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
                                        <div className='py-2'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-inbox"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg></div>
                                        <div className='-mt-1 px-2'>All stories</div>
                                    </Link>
                                </li>
                            </React.Fragment>
                        ) : null
                    }
                    <li className={location.pathname === '/catagories' ? 'active-page' : ''}>
                        <Link to="/catagories" style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
                            <div className='py-2'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></div>
                            <div className='-mt-1 px-2'>Catagories</div>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}
