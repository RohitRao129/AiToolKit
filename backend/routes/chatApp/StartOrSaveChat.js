const express =require("express");
const router = express.Router();
const Chat = require("../../models/Chats");
require('dotenv').config();
const jwt =require("jsonwebtoken");

router.post("/startorsavechat", async (req,res)=>{

    try{

        let {currentChatId,tittle,messages,jwtToken} = req.body;
        let owner =jwt.verify(jwtToken,process.env.JWTSECRETKEY).user.id;
        
        if(!currentChatId){
           let currentchat = await Chat.create({owner:owner,tittle:tittle,messages:messages});
           currentChatId =currentchat._id;
        }
        else{
            await Chat.findByIdAndUpdate(currentChatId,{$set:{tittle:tittle , messages:messages}});
        }

        return res.json({success:true,currentChatId});

    }
    catch(error){
        //console.log(error);
        res.json({success : false});
    }

})

module.exports = router;