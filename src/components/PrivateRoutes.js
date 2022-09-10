import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import userAuthStore from '../auth/userAuth'

export default function PrivateRoutes() {

  const userAuth = userAuthStore((state) => state.userAuth);

  return (
    !userAuth.loggedIn ? <Navigate to='/' /> : <Outlet />
  )
}
