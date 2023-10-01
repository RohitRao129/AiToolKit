import React, {useState,useRef,useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import NavbarTop from "../../components/NavbarTop.js";
import {LuSendHorizonal} from "react-icons/lu";

const TextApp = () => {
    const [userInput, setUserInput] = useState("");
    const [messages ,setMessages] = useState([]);
    let navigate = useNavigate();
    let context = "";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(localStorage.getItem("lastReply")){context=localStorage.getItem("lastReply");localStorage.removeItem("lastReply");}

        setMessages(messages =>[...messages,{sender:"Self",text:userInput}]);
        
        if (!localStorage.getItem("authToken")) {navigate("/login")}
        
        let query =userInput;
        setUserInput("");

        const response = await fetch("http://localhost:5000/getchat", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {query: query, context: context}
            )
        })
        const jsonResponse = await response.json();
         
        let Reply ="Please refrain from using foul language in chat.";
        if(jsonResponse.success===true){
            Reply = jsonResponse.result;
            localStorage.setItem("lastReply",Reply);
        }

        setMessages(messages =>[...messages,{sender:"AI",text:Reply}]);

    };

    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
      };

    return (
        <>
        
            <div className="h-100 boundery-box d-flex flex-column">
                <NavbarTop/>
                    <div className=" col-12 col-md-10 col-lg-8 my-3 mx-auto rounded-4 border border-2 d-flex flex-column" style={{height:"85%"}}>

                        <div className="text-center">
                            <svg width="0" height="0">
                                <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                                    <stop stopColor="#7a6ded" offset="0%"/>
                                    <stop stopColor="#591885" offset="100%"/>
                                </linearGradient>
                            </svg>
                            <div style={
                                {
                                    fontSize: "32px",
                                    fontWeight: "bold",
                                    background: "linear-gradient(#f492f0, #a18dce)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent"
                                }
                            }>Chat with Bard</div>
                        </div>

                        <div className="h-75 overflow-auto">
                           
                           {messages.map(msg=>{
                                if(msg.sender==="AI"){
                                    return (<div className="chat" style={{backgroundColor:"#CED3DC"}}>{msg.text} </div>);
                                }
                                return (<div className="chat" style={{backgroundColor:"#e6fff3"}}>{msg.text} </div>);
                           })}
                           
                           <AlwaysScrollToBottom />
                        </div>

                        <form id="chatInput" className=" mt-auto mb-3   mx-3 w-100 "
                            onSubmit={handleSubmit}>
                                <fieldset >
                                    <input className="col-md-10 col-9 p-1 ps-3 " placeholder="Start Chatting Here" type="text"value={userInput}onChange={(e) => setUserInput(e.target.value)}/>
                                    <button className="py-1 px-3 mx-1 rounded"style={{fontSize: "16px"}}type="submit"><LuSendHorizonal/></button>
                                </fieldset>
                            
                        </form>


                    </div>

                </div>

        </>
    );
};

export default TextApp;
