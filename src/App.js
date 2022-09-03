import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Dashboard from "./Dashboard";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
