import React from 'react'
import {Link} from 'react-router-dom'
import {FiImage,FiHardDrive,FiMusic,FiArrowRight} from "react-icons/fi";
import {BsChatLeftDots} from "react-icons/bs";
import NavbarSide from'../components/NavbarSide';

export default function HomeSidebar() {

    return (
        <>
            <div className='d-flex 'style={{minHeight: "100vh"}}>

                <NavbarSide/>
                <div className='w-100 '>
                    <div className='text-center my-5' >
                        <h1 style={{fontWeight:"bold"}}>Explore The world of AI</h1>
                        <p style={{color:"grey"}}>Chat with Ai - Make your ideas real</p>
                    </div>
                    
                    <Link className='col-lg-9 col-md-10 col-sm-10 col-0 mx-auto my-5 text-center d-flex ' style={{textDecoration:"none"}} to="/textgeneration">
                        <div className='d-flex' >
                            <BsChatLeftDots className='mx-3 mt-1' style={{color:"#443B85",fontSize:"32px"}}/>
                            <p className='text-dark' style={{fontWeight:"600", fontSize:"20px"}}>Chat with AI</p>
                        </div>
                        <FiArrowRight className='ms-auto' style={{color:"#443B85",fontSize:"25px"}}></FiArrowRight>
                    </Link>

                    <Link className='col-lg-9 col-md-10 col-sm-10 col-0 mx-auto my-5 text-center d-flex ' style={{textDecoration:"none"}} to="/imagegeneration">
                        <div className='d-flex' >
                            <FiImage className='mx-3 mt-1' style={{color:"#813628",fontSize:"32px"}}/>
                            <p className='text-dark' style={{fontWeight:"600", fontSize:"20px"}}>Make Images</p>
                        </div>
                        <FiArrowRight className='ms-auto' style={{color:"#813628",fontSize:"25px"}}></FiArrowRight>
                    </Link>

                    <Link className='col-lg-9 col-md-10 col-sm-10 col-0 mx-auto my-5 text-center d-flex ' style={{textDecoration:"none"}} to="/audiogeneration">
                        <div className='d-flex' >
                            <FiMusic className='mx-3 mt-1' style={{color:"#27645C",fontSize:"32px"}}/>
                            <p className='text-dark' style={{fontWeight:"500", fontSize:"20px"}}>Make Music</p>
                        </div>
                        <FiArrowRight className='ms-auto' style={{color:"#27645C",fontSize:"25px"}}></FiArrowRight>
                    </Link>

                    {(localStorage.getItem("nothing"))?
                            <Link id="savedGenButton" className='col-lg-9 col-md-10 col-sm-10 col-0 mx-auto my-5 text-center d-flex ' style={{textDecoration:"none"}} to="/account">
                                <div className='d-flex' >
                                    <FiHardDrive className='mx-3 mt-1' style={{color:"gray",fontSize:"32px"}}/>
                                    <p className='text-dark' style={{fontWeight:"550", fontSize:"20px"}}>Saved Generations</p>
                                </div>
                                <FiArrowRight className='ms-auto' style={{color:"gray",fontSize:"25px"}}></FiArrowRight>
                            </Link>

                    : ""}

    
                </div>

            </div>


        </>
    )
}
