const express = require("express");
const router = express.Router();
const Account = require("../../models/Accounts");
const {body, validationResult} = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken");
require('dotenv').config();

router.post("/login", 
    //---------Express validator--------------------
    [
        body("username").isLength({min:5,max:24}),
        body('password').isLength({min:6,max:24})
    ],

async (req,res)=>{

    const validateerror = validationResult(req);

    if (! validateerror.isEmpty()) {
        return res.status(400).json({success:false,errors: validateerror.array(),code:0});
    }


    
    try{

        let username = req.body.username;
        let accountSearchResult = await Account.findOne({username});

        if(!accountSearchResult){
            return res.status(400).json({success:false,errors: "User not found!",code:1});
        }

        const passMatchResulet = await bcrypt.compare(req.body.password, accountSearchResult.password);

        if(!passMatchResulet){
            return res.status(400).json({success:false,errors: "Incorrect password!",code:2});
        }

        const data = {
            user:{
                id: accountSearchResult.id
            }
        }

        const authToken = jwt.sign(data,process.env.JWTSECRETKEY,{expiresIn:process.env.TOKENEXPIRETIME});

        return res.json({success:true,authToken:authToken});

    }
    catch(error){
        //console.log(error);
        res.json({success : false});
    }

})

module.exports = router;
