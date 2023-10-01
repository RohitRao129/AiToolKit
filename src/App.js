import Home from './screens/Home.js';
import Login from './screens/authentication/Login.js';
import SignUp from './screens/authentication/SignUp.js';
import ChangePassword from './screens/authentication/ChangePassword.js';
import TextApp from './screens/apps/TextApp.js';
import ImageApp from './screens/apps/ImageApp.js';
import AudioApp from './screens/apps/AudioApp.js';
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
          <Route exact path='/textgeneration' element={<TextApp/>}/>
          <Route exact path='/imagegeneration' element={<ImageApp/>}/>
          <Route exact path='/audiogeneration' element={<AudioApp/>}/>
        </Routes>
    </Router>
  );
}

export default App;
