const express = require("express");
const router = express.Router();
const Chat = require("../../models/Chats");
require('dotenv').config();
const jwt =require("jsonwebtoken");

router.post("/fetchallchats", async (req, res) => {

    try {

        let {jwtToken} = req.body;
        let owner = jwt.verify(jwtToken, process.env.JWTSECRETKEY).user.id;

        let fetchedChats = await Chat.find({owner:owner});

        let chatIds =[];

        fetchedChats.map(chat =>{
            chatIds.push({id:chat._id,tittle :chat.tittle});
        })

        return res.json({success: true, chatIds});

    } catch (error) {
        console.log(error);
        res.json({success: false});
    }


})

module.exports = router;
