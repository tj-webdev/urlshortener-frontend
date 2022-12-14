import React from 'react';
import {NavLink} from 'react-router-dom';
import Logout from '../Logout';
import userAuthStore from '../auth/userAuth';

export default function Header() {

  const userAuth = userAuthStore((state) => state.userAuth);

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <h5 className="navbar-brand fw-bold m-0 me-4">URL Shortener</h5>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                { userAuth.loggedIn === false && <NavLink className="btn" to="/">Home</NavLink> }
                { userAuth.loggedIn === true && <NavLink className="btn" to="/dashboard">Dashboard</NavLink> }
              </li>
            </ul>
            {
              (userAuth.name !== undefined && userAuth.loggedIn === true) && <>
                <div className='d-flex align-items-center'>
                  <h6 className='mb-0 me-3'>Welcome, {userAuth.name}</h6>
                  <Logout />
                </div>
              </>
            }
            {
              (userAuth.loggedIn === false) && <>
                <div>
                  <NavLink to='/login' className="btn fw-bold me-3">Log in</NavLink>
                  <NavLink to='/signup' className="btn fw-bold">Sign up</NavLink>
                </div>
              </>
            }            
          </div>
        </div>
      </nav>
    </>
  )
}
