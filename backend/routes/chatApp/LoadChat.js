const express =require("express");
const router = express.Router();
const Chat = require("../../models/Chats");
require('dotenv').config();
const jwt =require("jsonwebtoken");

router.post("/loadchat", async (req,res)=>{

    try{

        let chatId = req.body.chatId;
        let loadedchat = await Chat.findOne({chatId});
        

        return res.json({success:true,loadedchat:loadedchat});

    }
    catch(error){
        //console.log(error);
        res.json({success : false});
    }

})

module.exports = router;