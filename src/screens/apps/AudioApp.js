import React, {useState,useRef,useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import NavbarTop from "../../components/NavbarTop.js";
import {LuSendHorizonal,LuClipboard} from "react-icons/lu";
import {RiDeleteBin6Line} from "react-icons/ri";
import PulseLoader from "react-spinners/PulseLoader";

export default function AudioApp() {
  const [userInput, setUserInput] = useState("");

  return (
    <div className=" boundery-box d-flex flex-column h-100">
    <NavbarTop/>

    <div className="d-flex w-100 flex-column flex-sm-row-reverse flex-fill" style={{height:"91%"}}>
        
        <div className="d-flex flex-column col-11 col-sm-8 my-auto mx-auto rounded-3 border border-2" style={{height:"80vh"}} >
                <div className="text-center position-relative ">
                    <svg width="0" height="0">
                        <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                            <stop stopColor="#7a6ded" offset="0%"/>
                            <stop stopColor="#591885" offset="100%"/>
                        </linearGradient>
                    </svg>
                    <div className="mx-auto" style={{fontSize: "32px",fontWeight: "bold",background: "linear-gradient(#f492f0, #a18dce)",WebkitBackgroundClip: "text",WebkitTextFillColor: "transparent"}}>Compose Now</div>
                </div>
                
                <form id="chatInput" className=" mb-2 ms-5 mt-auto w-100 ">
                                    <fieldset >
                                        <input className="col-md-10 col-9 p-1 ps-3 rounded border-secondary shadow" placeholder="Enter Prompt" type="text"/>
                                        <button className="py-1 px-2 px-md-3 mx-1 rounded"style={{fontSize: "16px"}}type="submit"><LuSendHorizonal/></button>
                                    </fieldset>
                                
                </form>

        </div>
        
        <div className="bg-dark mx-auto mx-sm-0 col-11 col-sm-3 d-flex flex-column text-light overflow-auto" style={{height:"93vh"}}>
                        <div className="my-2 text-light d-flex w-100 flex-row flex-sm-column flex-md-row">
                            <input className="ms-2 rounded" type="text" placeholder="save as"></input>
                            <button className="ms-auto me-2 bg-transparent py-1 border rounded text-light" >Save</button>
                        </div>
        </div>
                
    </div>

</div>
  )
}
