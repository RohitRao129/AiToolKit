import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {FiGrid, FiImage, FiHardDrive, FiMusic} from "react-icons/fi";
import {TfiJsfiddle} from "react-icons/tfi";
import {BsChatLeftDots} from "react-icons/bs";

export default function Navbar() {

    let navigate = useNavigate();
    const logoutUser = async () => {
        localStorage.removeItem("authToken");
        navigate("/");
    }

    return (
        <>
            <div className="w-100 px-3 py-2 d-flex flex-wrap border-bottom border-2">
                <div className='my-1 mx-2'>
                    <Link className='nav-link' to='/'>Home</Link>
                </div>

                <div className='d-none d-sm-flex'>
                    <div className='col-sm-0 my-1 mx-2'>
                        <Link className='nav-link' to="/textgeneration">ChatNow</Link>
                    </div>
                    <div className='col-lg-0 my-1 mx-2'>
                        <Link className='nav-link' to="/imagegeneration">DrawNow</Link>
                    </div>
                    <div className='col-0 my-1 mx-2'>
                        <Link className='nav-link' to="/audiogeneration">ComposeSongs</Link>
                    </div>
                </div>


                <div className='my-1 ms-auto'>
                    {
                    (!localStorage.getItem("authToken")) ? <Link className='nav-link' to='/login'>Login/Signup</Link> : <Link className='nav-link'>
                        <span onClick={logoutUser}>Logout</span>
                    </Link>
                } </div>


            </div>
        </>
    )
}
