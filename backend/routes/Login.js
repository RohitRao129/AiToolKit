const express = require("express");
const router = express.Router();
const Account = require("../models/Accounts");
const {body, validationResult} = require('express-validator');

router.post("/login", 
[
    body("username").isLength({min:5,max:24}),
    body('password').isLength({min:6,max:24})
],

async (req,res)=>{

    const validateerror = validationResult(req);

    if (! validateerror.isEmpty()) {
        return res.status(400).json({success:false,errors: validateerror.array()});
    }

    let username = req.body.username;
    try{
        let searchresult = await Account.findOne({username});

        if(!searchresult){
            return res.status(400).json({success:false,errors: "User not found!"});
        }

        if(req.body.password!==searchresult.password){
            return res.status(400).json({success:false,errors: "Incorrect password!"});
        }

        return res.json({success:true,errors: "User Logged in!"});

    }
    catch(error){
        console.log(error);
        res.json({success : false});
    }

})

module.exports = router;
