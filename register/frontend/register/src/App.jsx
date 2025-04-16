
import { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './ProtectedRoutes/Home';
import Protectedcomp from './ProtectedRoutes/Protectedcomp'
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import UserContext from './Usercontext';
const App = () => {
  const [userEmail, setUserEmail] = useState("");
  return (
    <div className="App d-flex justify-content-center align-items-center vh-100">
      <UserContext.Provider value={{ userEmail, setUserEmail }}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/Register' element={<RegisterForm />} />
        <Route path='/home' element={<Protectedcomp> <Home /> </Protectedcomp>} />
      </Routes>
      </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
};

export default App;

