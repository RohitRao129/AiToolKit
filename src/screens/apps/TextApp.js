import React, {useState,useRef,useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import NavbarTop from "../../components/NavbarTop.js";
import {LuSendHorizonal} from "react-icons/lu";

const TextApp = () => {
    const [userInput, setUserInput] = useState("");
    const [messages ,setMessages] = useState([]);
    const [wasSaved , setWasSaved] =useState(true);
    const [saveInfo,setSaveinfo] =useState("");
    const [currentChatId,setCurrentChatId] =useState("");
    const [tittle,setTittle] =useState("");
    const [context,setContext] =useState("");
    let navigate = useNavigate();


    //saving the current chat or updating if already created a save file in DB and getting back the chat Id
    const saveOrUpdateChat = async(e) =>{
        e.preventDefault();
        if (!localStorage.getItem("authToken")) {navigate("/login")}
        
        try{

            setTittle(tittle);
            const response = await fetch("http://localhost:5000/startorsavechat", {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {currentChatId: currentChatId, tittle:tittle, messages:messages, jwtToken:localStorage.getItem("authToken")}
                )
            })
            
            const jsonResponse = await response.json();
            setCurrentChatId(jsonResponse.currentChatId);
            
            setWasSaved(jsonResponse.success);
            wasSaved? setSaveinfo("Saved!") :setSaveinfo("Save failed");

        }catch(err){
            //console.log(err)
            setWasSaved(false);
            setSaveinfo("Save failed");
        }

        await setTimeout(()=>{setSaveinfo("")},1000);
    }

    //fetching all the saved chat`s Ids
    const fetchAllChatIds =async (e) =>{
        e.preventDefault();
        if (!localStorage.getItem("authToken")) {navigate("/login")}

        try{
            const response = await fetch("http://localhost:5000/fetchallchats", {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {jwtToken:localStorage.getItem("authToken")}
                )
            })
            
            const jsonResponse = await response.json();

        }catch(err){
        }

    }



    const loadChat =async(e)=>{
        e.preventDefault();
        if (!localStorage.getItem("authToken")) {navigate("/login")}
    }

    //requesting prompt chat from Bard
    const chatRequest = async (e) => {
        e.preventDefault();

        setMessages(messages =>[...messages,{sender:"Self",text:userInput}]);
        
        let query =userInput;
        setUserInput("");

        const response = await fetch("http://localhost:5000/chatrequest", {
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
            setContext(Reply);
        }

        setMessages(messages =>[...messages,{sender:"AI",text:Reply}]);
    };


    //dont expand
    const handleSubmit =async (e) =>{
        e.preventDefault();
        if (!localStorage.getItem("authToken")) {navigate("/login")}

        try{
            chatRequest(e);
        }catch(err){
            //console.log(err)*
        }
        
    }



    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
      };

    return (
        <>
        <div className=" boundery-box d-flex flex-column h-100">
            <NavbarTop/>

            <div className="flex-fill d-flex w-100">
                <div className="bg-dark col-2 col-sm-3 d-none d-sm-flex flex-column text-light overflow-auto">
                    <div>
                        <button id="c-1" onClick={loadChat} className="w-75 bg-secondary my-2 mx-2 rounded-2 py-1 text-center border border-0 text-light" >Chat 1</button>
                    </div>
                </div>
                        
                <div className=" col-11 col-sm-8 my-3 mx-auto rounded-4 border border-2 d-flex flex-column" >
                    <div className="text-center position-relative ">
                        <svg width="0" height="0">
                            <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                                <stop stopColor="#7a6ded" offset="0%"/>
                                <stop stopColor="#591885" offset="100%"/>
                            </linearGradient>
                        </svg>
                        <div className="mx-auto" style={{fontSize: "32px",fontWeight: "bold",background: "linear-gradient(#f492f0, #a18dce)",WebkitBackgroundClip: "text",WebkitTextFillColor: "transparent"}}>Chat with Bard</div>
                        <div className="position-absolute top-0 end-0 d-flex flex-column">
                            <form>
                                { currentChatId===""? <input value={tittle} onChange={(e)=>{setTittle(e.target.value)}} type="text" placeholder="save as"></input>:null}
                                <button onClick={saveOrUpdateChat} className="border m-2 border-0 rounded-2 bg-success text-light " >{currentChatId==="" ? "Save" :"Update"}</button>
                                <div id="saveInfo" className={ wasSaved ? "text-primary" :"text-danger"} >{saveInfo}</div>
                            </form>
                        </div>
                    </div>
                                        

                    <div className="h-75 overflow-auto">
                    
                        {messages.map(msg=>{
                                if(msg.sender==="AI"){
                                    return (<div className="chat" style={{backgroundColor:"#CED3DC"}}>{msg.text} </div>);
                                }
                                return (<div className="chat " style={{backgroundColor:"#e6fff3"}}>{msg.text} </div>);
                        })}
        
                        <AlwaysScrollToBottom />
                    </div>

                    <form id="chatInput" className=" my-2 mx-md-3 mx-1 w-100 "
                        onSubmit={handleSubmit}>
                            <fieldset >
                                <input className="col-md-10 col-9 p-1 ps-3 " placeholder="Start Chatting Here" type="text"value={userInput}onChange={(e) => setUserInput(e.target.value)}/>
                                <button className="py-1 px-2 px-md-3 mx-1 rounded"style={{fontSize: "16px"}}type="submit"><LuSendHorizonal/></button>
                            </fieldset>
                        
                    </form>
                </div>
                        
            </div>

        </div>
        </>
    );
};

export default TextApp;
