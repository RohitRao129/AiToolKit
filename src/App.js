import Home from './screens/Home.js';
import HomeSidebar from './screens/HomeSidebar.js';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
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
          <Route exact path='/' element={<HomeSidebar/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/signup' element={<SignUp/>}/>
        </Routes>
    </Router>
  );
}

export default App;
