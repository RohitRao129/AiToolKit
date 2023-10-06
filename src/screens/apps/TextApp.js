import React, {useState,useRef,useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import NavbarTop from "../../components/NavbarTop.js";
import {LuSendHorizonal,LuClipboard} from "react-icons/lu";
import {RiDeleteBin6Line} from "react-icons/ri";
import PulseLoader from "react-spinners/PulseLoader";

const TextApp = () => {
    const [userInput, setUserInput] = useState("");
    const [formEnabled,setFormEnabled] =useState(true);
    const [messages ,setMessages] = useState([]);
    const [previousChats ,setPreviousChats] = useState([{}]);

    const [wasSaved , setWasSaved] =useState(true); 
    const [saveInfo,setSaveinfo] =useState("");

    const [currentChatId,setCurrentChatId] =useState("");
    const [tittle,setTittle] =useState("Saved Chat");

    let navigate = useNavigate();

      //requesting prompt chat from Bard
    const getResultRequest = async (e) => {

        setMessages(messages =>[...messages,{sender:"Self",text:userInput}]);
        let query =userInput;
        setUserInput("");

        const response = await fetch("http://localhost:5000/chatrequest", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {query: query, context: messages.length>1  ? messages[messages.length-1].text: "" }
            )
        })
        const jsonResponse = await response.json();
         
        let Reply ="Please refrain from using foul language in chat.";
        if(jsonResponse.success===true){
            Reply = jsonResponse.result;
        }

        setMessages(messages =>[...messages,{sender:"AI",text:Reply}]);
    };

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
            fetchAllChatIds()
            
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
    const fetchAllChatIds =async() =>{
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
            jsonResponse.chatIds.reverse();
            await setPreviousChats(jsonResponse.chatIds);

        }catch(err){
            console.log(err)
        }

    }

    const loadChat =async(e)=>{
        if (!localStorage.getItem("authToken")) {navigate("/login")}

        try{
            const response = await fetch("http://localhost:5000/loadchat", {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {chatId: previousChats[e].id}
                )
            })
            
            const jsonResponse = await response.json();

            if(jsonResponse.success===true){
                setMessages(jsonResponse.messages);
                setCurrentChatId(previousChats[e].id);
            }

        }catch(err){
            console.log(err)
        }

    }

    const deleteChat =async(e) =>{
        if (!localStorage.getItem("authToken")) {navigate("/login")}
        
        try{
            const response = await fetch("http://localhost:5000/deletechat", {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {chatId: previousChats[e].id}
                )
            })
            
            const jsonResponse = await response.json();

            if(jsonResponse.success===true){
                if(previousChats[e].id===currentChatId){setCurrentChatId("");}
                fetchAllChatIds();
                //console.log(previousChats);
            }

        }catch(err){
            console.log(err)
        }
        
    }

    //dont expand
    const handleSubmit =async (e) =>{
        e.preventDefault();
        setFormEnabled(false);

        if (!localStorage.getItem("authToken")) {navigate("/login")}

        try{
           await getResultRequest(e);
        }catch(err){
            //console.log(err)*
        }

        setFormEnabled(true);
    }

    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => {elementRef.current.scrollIntoView()},[]);
        return <div ref={elementRef} />;
      };

    useEffect(() => {fetchAllChatIds();},[]);

    return (
        <>
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
                                <div className="mx-auto" style={{fontSize: "32px",fontWeight: "bold",background: "linear-gradient(#f492f0, #a18dce)",WebkitBackgroundClip: "text",WebkitTextFillColor: "transparent"}}>Chat with Bard</div>
                            </div>

                            <div className="h-75 overflow-auto">
                            
                                {messages.map(msg=>{
                                        if(msg.sender==="AI"){
                                            return (
                                                <div className="chat" style={{backgroundColor:"#CED3DC"}}> 
                                                    <div className="text">{msg.text}</div> 
                                                    <button onClick={() => {navigator.clipboard.writeText(msg.text)}} className="copy position-absolute top-0 end-0  bg-transparent border-0" >
                                                    <LuClipboard/>
                                                    </button>
                                                </div>
                                            );
                                        }
                                        return (<div className="chat w-auto" style={{backgroundColor:"#e6fff3"}}>{msg.text} </div>);
                                })}

                                {!formEnabled? <div className="chat position-relative w-auto my-0" style={{backgroundColor:"#CED3DC"}}><PulseLoader color="grey" size={8} /></div>   : null}
                                <AlwaysScrollToBottom/>
                
                            </div>

                            <form id="chatInput" className="my-2 ms-4 w-100 "
                                onSubmit={handleSubmit}>
                                    <fieldset disabled={!formEnabled}>
                                        <input className="col-md-10 col-9 p-1 ps-3 rounded border-secondary shadow" placeholder="Start Chatting Here" type="text"value={userInput}onChange={(e) => setUserInput(e.target.value)}/>
                                        <button className="py-1 px-2 px-md-3 mx-1 rounded"style={{fontSize: "16px"}}type="submit"><LuSendHorizonal/></button>
                                    </fieldset>
                                
                            </form>
                    </div>
                    
                    <div className="bg-dark mx-auto mx-sm-0 col-11 col-sm-3 d-flex flex-column text-light overflow-auto" style={{height:"93vh"}}>
                        
                        <div className="my-2 text-light d-flex w-100 flex-row flex-sm-column flex-md-row">
                            { currentChatId===""? <input className="ms-2 rounded" value={tittle} onChange={(e)=>{setTittle(e.target.value)}} type="text" placeholder="save as"></input>:<button type="button" onClick={(e)=>{setCurrentChatId("");setMessages([]);setTittle("")}} className="ms-2 bg-transparent py-1 border rounded text-light" >New Chat</button>}
                            <button onClick={saveOrUpdateChat} className="ms-auto me-2 bg-transparent py-1 border rounded text-light" >{currentChatId==="" ? "Save" :"Update"}</button>
                            <div className={saveInfo ? "text-success mt-1":"text-danger mt-1"}> {saveInfo}</div>
                        </div>
                        
                        {previousChats.map(chat =>{
                            return(
                                <div className="my-2 mx-2 rounded-2 py-1 text-center border border-1 text-light d-flex" style={{backgroundColor: currentChatId===chat.id? "#27645C":"#212529"}} >
                                    <button type="button"  onClick={(e)=>{loadChat(previousChats.indexOf(chat))}} className="ms-2 bg-transparent py-1 border border-0 text-light overflow-hidden" >{chat.tittle}</button>
                                    <button type="button"  onClick={(e)=>{deleteChat(previousChats.indexOf(chat))}}  className="ms-auto bg-transparent me-1 border border-0 text-light" > <RiDeleteBin6Line/></button>
                                </div>
                            )
                        })}
                    </div>
                            
                </div>

            </div>
        </>
    );
};

export default TextApp;
