const express = require("express");
const router = express.Router();
const Account = require("../../models/Accounts");
const {body, validationResult} = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken");

router.post("/changepassword",
[
    body("email").isEmail(),
    body('password').isLength({min:6,max:24}),
    body('confirmpassword').custom((value, {req}) => value === req.body.password).withMessage("The passwords do not match")
],

async (req, res) => {

    try {
        const validateerror = validationResult(req);

        if (! validateerror.isEmpty()) {
            return res.status(400).json({errors: validateerror.array()});
        }

        //-------------checking if creds are awilable-------------

        let email = req.body.email;
    
        let accountSearchResult = await Account.findOne({email});

        if(!accountSearchResult){
            return res.status(400).json({success:false,errors: "Email is not Registered"});
        }

        if(accountSearchResult.otp !== req.body.otp){
            return res.status(400).json({success:false,errors: "Incorrect OTP"});
        }

        //----------Hashing the password using bcryptjs-------------------------------------

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt); 

        //---------making new account entry in database--------------------------
        await Account.updateOne({email:email},{$set : {password: hashedPassword,otp:-1}})
        res.json({success: true, message: "Password Updated successfully. Try loging again"})

    } catch (error) {
        console.log(`error: ${error}`);
        res.json({success: false, message: "Some error occured."})
    }

})


module.exports = router;