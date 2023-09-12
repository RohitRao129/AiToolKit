const express =require("express");
const router =express.Router();
const Account = require("../models/Accounts");


router.post("/signup" ,async (req, res)=>{
    try{
        await Account.create({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        res.json({success:true,message :"New account created successfully."})
    }
    catch(error){
        console.log(`error: ${error}`);
        res.json({success:false,message :"Some error occured."})
    }
})


module.exports = router;