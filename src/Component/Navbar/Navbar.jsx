import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar(props) {
  let { user, logOut } = props

  

  return (
    <>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="home">Website</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {user !=null ?  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link active fs-3 text-danger" : "nav-link"} aria-current="page" to="home">Home</NavLink>
              </li>
              <li className="nav-item mx-5">
                <button className=" btn btn-dark mt-2 " aria-current="page" onClick={logOut} >LogOut</button>
              </li>
            </ul>:  <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link active fs-3 text-danger" : "nav-link"} to="login">Login</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link active fs-3 text-danger" : "nav-link"} to="register">Register</NavLink>

              </li>
            </ul>}
          

          

          </div>
        </div>
      </nav>
    </>
  )
}
