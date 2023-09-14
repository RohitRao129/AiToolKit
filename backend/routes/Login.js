const express = require("express");
const router = express.Router();
const Account = require("../models/Accounts");
const {body, validationResult} = require('express-validator');
const bcrypt = require("bcryptjs");

router.post("/login", 
    //---------Express validator--------------------
    [
        body("username").isLength({min:5,max:24}),
        body('password').isLength({min:6,max:24})
    ],

async (req,res)=>{

    const validateerror = validationResult(req);

    if (! validateerror.isEmpty()) {
        return res.status(400).json({success:false,errors: validateerror.array()});
    }


    
    try{

        let username = req.body.username;
        let searchresult = await Account.findOne({username});
        
        console.log(searchresult);

        if(!searchresult){
            return res.status(400).json({success:false,errors: "User not found!"});
        }

        const passMatchResulet = await bcrypt.compare(req.body.password, searchresult.password);

        if(!passMatchResulet){
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
