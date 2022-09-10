import React from 'react';
import axios from 'axios';
import userAuthStore from './auth/userAuth';

export default function Logout() {

  const setAuth = userAuthStore((state)=>state.setAuth);

  async function logout()
  {
    await axios.get('/user/logout',{withCredentials: true});
    setAuth({name: undefined, loggedIn: false});
  }

  return (
    <button onClick={logout} className="btn fw-bold">Log out</button>
  )
}
