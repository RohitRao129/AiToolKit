import React from 'react'
import {Link,useNavigate} from 'react-router-dom'

export default function Navbar() {
    let navigate =useNavigate();
    const  logoutUser =() =>{
        localStorage.removeItem("authToken");
        navigate("/");
    }


    return (
        <>
            <nav  className="p-2 navbar-expand-lg bg-secondary ">
                <div className="container-fluid w-100">
                    <ul className="navbar-nav w-100 d-flex text-light">
                        <li className="nav-item ">
                            <Link className="nav-link active px-3" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link px-3" to="/textgeneration">Text Generation</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link px-3" to='/imagegeneration'>Image Generation</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link px-3" to='/audiogeneration'>Audio Generation</Link>
                        </li>
                        <li className='nav-item ms-auto'>
                        {(!localStorage.getItem("authToken"))?
                            <Link className='nav-link active' to='/signup'>Login/Signup</Link>

                            : 
                            <button type="button" onClick={logoutUser} class="btn btn-success">Logout</button>}
                        </li>
                    </ul>

                </div>
            </nav>

        </>
    )
}
