import { Routes, Route, Navigate } from 'react-router-dom';
import Header from "./components/Header";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Dashboard from "./Dashboard";
import NotFound from './NotFound';
import Analytics from './Analytics';
import Redirect from './components/Redirect';
import PrivateRoutes from './components/PrivateRoutes';

import userAuthStore from './auth/userAuth';
import { useEffect } from 'react';

function App() {

  const {userAuth, fetch} = userAuthStore((state)=> ({userAuth: state.userAuth, fetch: state.fetch}));
  useEffect(()=>{
    fetch();
  },[]);

  return (
    <>
      <Header />
      <Routes>

        <Route element={<PrivateRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/analytics/:id' element={<Analytics />} />
        </Route>

        <Route exact path='/' element={ !userAuth.loggedIn ?  <Home /> : <Navigate to='/dashboard' replace /> } />

        <Route path='/login' element={ !userAuth.loggedIn ? <Login /> : <Navigate to='/dashboard' replace /> } />
        <Route path='/signup' element={ !userAuth.loggedIn ? <Signup /> : <Navigate to='/dashboard' replace /> } />

        <Route path='/404' element={<NotFound />} />
        <Route path='/:id' element={<Redirect />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
