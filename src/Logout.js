import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import userAuthStore from './auth/userAuth';

export default function Logout() {

  const setAuth = userAuthStore((state)=>state.setAuth);
  const navigate = useNavigate();

  async function logout()
  {
    await axios.get('http://localhost:4000/user/logout',{withCredentials: true});
    setAuth({name: undefined, loggedIn: false});
    navigate('/',{replace: true});
  }

  return (
    <button onClick={logout} className="btn fw-bold">Log out</button>
  )
}
