import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid w-100">
                    <ul className="navbar-nav w-100 d-flex text-light">
                        <li className="nav-item ">
                            <Link className="nav-link active" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/textgeneration">Text Generation</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/imagegeneration'>Image Generation</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/audiogeneration'>Audio Generation</Link>
                        </li>
                        <li className='nav-item ms-auto'>
                            <Link className='nav-link active' to='/signup'>Login/Signup</Link>
                        </li>
                    </ul>

                </div>
            </nav>
        </>
    )
}
