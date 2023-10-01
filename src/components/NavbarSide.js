import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {FiGrid ,FiImage,FiHardDrive,FiMusic} from "react-icons/fi";
import {TfiJsfiddle} from "react-icons/tfi";
import {BsChatLeftDots} from "react-icons/bs";

export default function Navbar() {
   
    let navigate =useNavigate();
    const  logoutUser =async () =>{
        localStorage.removeItem("authToken");
        document.getElementById("savedGenButton").innerHTML = "";
        navigate("/");
    }

    return (
        <>
            <div className="col-lg-2 col-sm-5 col-12"style={{minHeight: "100vh",backgroundColor:"#121624"}}>
                    
                    <div className='my-4 text-light text-center d-flex'>
                        <svg width="0" height="0">
                        <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                            <stop stopColor="#7a6ded" offset="0%" />
                            <stop stopColor="#591885" offset="100%" />
                        </linearGradient>
                        </svg>
                        <TfiJsfiddle className='mx-3' style={{fontSize:"48px", fill:"url(#blue-gradient)"}}/>
                        <div className='mt-1' style={{fontSize:"26px",fontWeight:"bold",background:"linear-gradient(#f492f0, #a18dce)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>AiToolKit</div>
                    </div>
                    
                    
                    <div className='p-2  d-flex rounded my-3 mx-2'>
                        <FiGrid className='mx-3' style={{color:"aqua",fontSize:"25px"}}/>
                        <Link className='nav-link text-light' to="/">Home</Link>
                    </div>

                    <div className='p-2  d-flex rounded my-3 mx-2' >
                        <BsChatLeftDots className='mx-3' style={{color:"#443B85",fontSize:"25px"}}/>
                        <Link className='nav-link text-light' to="/textgeneration">ChatGPT</Link>
                    </div>

                    <div className='p-2  d-flex rounded my-3 mx-2' >
                        <FiImage className='mx-3' style={{color:"#813628",fontSize:"25px"}}/>
                        <Link className='nav-link text-light' to="/imagegeneration">Dall-e</Link>
                    </div>

                    <div className='p-2  d-flex rounded my-3 mx-2' >
                        <FiMusic className='mx-3' style={{color:"#27645C",fontSize:"25px"}}/>
                        <Link className='nav-link text-light' to="/audiogeneration">Jukebox-Ai</Link>
                    </div>

                    <div className='p-2  d-flex rounded mt-auto my-3 mx-2' >
                        <FiHardDrive className='mx-3' style={{color:"gray",fontSize:"25px"}}/>
                        {(!localStorage.getItem("authToken"))?
                            <Link className='nav-link text-light' to='/login'>Login/Signup</Link>

                            : 
                            <Link className='nav-link text-light'><span onClick={logoutUser}>Logout</span></Link>}
                    </div>
                    
            </div>
        </>
    )
}
