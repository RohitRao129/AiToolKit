const express =require("express");
const router = express.Router();
const Chat = require("../../models/Chats");
require('dotenv').config();

router.post("/deletechat", async (req,res)=>{
    if(!req.body.chatId)return res.json({success:false});
    
    //console.log(req.body.chatId);
    try{
        
        await Chat.deleteOne({_id:req.body.chatId});

        return res.json({success:true});

    }
    catch(error){
        //console.log(error);
        res.json({success : false});
    }

})

module.exports = router;