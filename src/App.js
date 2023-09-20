import Home from './screens/Home.js';
import Login from './screens/authentication/Login.js';
import SignUp from './screens/authentication/SignUp.js';
import ChangePassword from './screens/authentication/ChangePassword.js';
import 'bootstrap/dist/js/bootstrap.bundle';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/signup' element={<SignUp/>}/>
          <Route exact path='/changepassword' element={<ChangePassword/>}/>
        </Routes>
    </Router>
  );
}

export default App;
