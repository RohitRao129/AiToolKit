const express =require("express");
const router = express.Router();
const Chat = require("../../models/Chats");
require('dotenv').config();
const jwt =require("jsonwebtoken");

router.post("/loadchat", async (req,res)=>{

    try{

        let chatId = req.body.chatId;
        let loadedchat = await Chat.findOne({_id:chatId});

        let messages =[];

        loadedchat.messages.map(msg =>{
            messages.push({sender : msg.sender,text:msg.text});
        })

        //console.log(messages);

        return res.json({success:true,messages:messages});

    }
    catch(error){
        //console.log(error);
        res.json({success : false});
    }

})

module.exports = router;