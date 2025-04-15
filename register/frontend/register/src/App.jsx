
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

import {BrowserRouter, Routes,Route} from 'react-router-dom';
const App = () => {

  return (
    <div className="App d-flex justify-content-center align-items-center vh-100">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/Register' element={<RegisterForm />} />
      </Routes>
      </BrowserRouter>

    </div>
  );
};

export default App;

