import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Dashboard from "./Dashboard";
import NotFound from './NotFound';
import Analytics from './Analytics';
import Redirect from './components/Redirect';

import userAuthStore from './auth/userAuth';

function App() {

  const userAuth = userAuthStore((state) => state.userAuth);

  return (
    <>
      <Header />
      <Routes>
        {
          (userAuth.name && userAuth.loggedIn) ? 
          (
            <>
              <Route path='/' element={<Dashboard />} />
              <Route path='/analytics/:id' element={<Analytics />} />
            </>
          )
          :(
            <>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
            </>
          )
        }
        <Route path='/404' element={<NotFound />} />
        <Route path='/:id' element={<Redirect />} />
      </Routes>
    </>
  );
}

export default App;
