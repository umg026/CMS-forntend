import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Sidebar from '../navbar/Sidebar'

export default function Layout() {
    return (
        <>

            <Navbar />
            <div>{<Outlet />}</div>
        </>
    )
}
