import React from 'react';
import {NavLink, Link} from 'react-router-dom';

export default function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand fw-bold me-4" to="/">URL Shortener</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="btn" to="/">Home</NavLink>
              </li>
            </ul>
            <div>
              <NavLink to='/login' className="btn fw-bold me-3">Log in</NavLink>
              <NavLink to='/signup' className="btn fw-bold">Sign up</NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
