
import './App.css';
import Home from './screens/Home.js';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/signup' element={<SignUp/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;