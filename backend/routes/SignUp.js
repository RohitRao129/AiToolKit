const express = require("express");
const router = express.Router();
const Account = require("../models/Accounts");
const {body, validationResult} = require('express-validator');


router.post("/signup", 
    [
        body("username").isLength({min: 5, max: 24}),
        body("email").isEmail(),
        body('password').isLength({min:8,max:24})
        //body('confirmpassword').
    ], 
    
    async (req, res) => {

    try {
        const validateerror = validationResult(req);

        if (! validateerror.isEmpty()) {
            return res.status(400).json({errors: validateerror.array()});
        }


        await Account.create({username: req.body.username, name: req.body.name, email: req.body.email, password: req.body.password})

        res.json({success: true, message: "New account created successfully."})

    } catch (error) {
        console.log(`error: ${error}`);
        res.json({success: false, message: "Some error occured."})
    }
})


module.exports = router;
