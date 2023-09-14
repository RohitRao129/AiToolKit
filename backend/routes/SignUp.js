const express = require("express");
const router = express.Router();
const Account = require("../models/Accounts");
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');


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
            return res.status(400).json({errors: validateerror.array()});
        }

        //-------------checking if creds are awilable-------------

        let username = req.body.username;
        let email = req.body.email;

        let searchresult = await Account.findOne({username});
        if(searchresult){
            return res.status(400).json({success:false,errors: "Username not awailable"});
        }

        searchresult = await Account.findOne({email});
        if(searchresult){
            return res.status(400).json({success:false,errors: "Email is already being used"});
        }

        //----------Hashing the password using bcryptjs-------------------------------------

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt); 

        //---------making new account entry in database--------------------------
        await Account.create({username: req.body.username, name: req.body.name, email: req.body.email, password: hashedPassword})

        res.json({success: true, message: "New account created successfully."})

    } catch (error) {
        console.log(`error: ${error}`);
        res.json({success: false, message: "Some error occured."})
    }
})

module.exports = router;
