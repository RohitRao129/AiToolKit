import React from 'react'

export default function ChatMessage(props) {

    if(props.sender=="AI"){
        return(
            <div class="chat" style={{backgroundColor:"#CED3DC"}}>{props.text} </div>
        )
    }
  
    return (
    <div class="chat"  style={{backgroundColor:"#e6fff3"}}>{props.text}</div>
  )
}
