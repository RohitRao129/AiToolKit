const express = require("express");
const router = express.Router();
const Account = require("../../models/Accounts");
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
require('dotenv').config();


router.post("/signup", 
    //-----express validator------------
    [
        body("username").isLength({min: 5, max: 24}),
        body("email").isEmail(),
        body('password').isLength({min:8,max:24}),
        body('confirmpassword').custom((value, {req}) => value === req.body.password).withMessage("The passwords do not match"),
    ], 
    
    async (req, res) => {

    try {
        const validateerror = validationResult(req);

        if (! validateerror.isEmpty()) {
            return res.status(400).json({success:false, errors: validateerror.array(),code:0});
        }

        //-------------checking if creds are awilable-------------

        let username = req.body.username;
        let email = req.body.email;

        let accountSearchResult = await Account.findOne({username});
        if(accountSearchResult){
            return res.status(400).json({success:false,errors: "Username not awailable",code:1});
        }

        accountSearchResult = await Account.findOne({email});
        if(accountSearchResult){
            return res.status(400).json({success:false,errors: "Email is already being used",code:2});
        }

        //----------Hashing the password using bcryptjs-------------------------------------

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt); 

        //---------making new account entry in database--------------------------
        await Account.create({username: req.body.username, name: req.body.name, email: req.body.email, password: hashedPassword})

        res.json({success: true, message: "New account created successfully."})

    } catch (error) {
        //console.log(`error: ${error}`);
        res.json({success: false, message: "Some error occured."})
    }
})

module.exports = router;
