import React from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import { Outlet } from 'react-router-dom'

export default function MasterLayout(props) {
    let {user,logOut}=props

    return (
        <>
            <Navbar user={user} logOut={logOut}/>
            <div className='container'>
                <Outlet />
            </div>
        </>
    )
}
