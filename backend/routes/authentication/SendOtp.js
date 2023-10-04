const express = require("express");
const router = express.Router();
const Account = require("../../models/Accounts");
const {body, validationResult} = require('express-validator');
var nodemailer = require('nodemailer');

router.post("/sendotp",
[
    body("email").isEmail(),
],

async (req, res) => {

    const validateerror = validationResult(req);

    if (! validateerror.isEmpty()) {
        return res.status(400).json({success:false, errors: validateerror.array()});
    }

    let email = req.body.email;
    accountSearchResult = await Account.findOne({email});
    if(!accountSearchResult){
        return res.status(400).json({success:false,errors: "Email not registered"});
    }


    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }

    await Account.findOneAndUpdate({email:email},{otp:OTP});

    try {


        const transporter = nodemailer.createTransport({
            service : "gmail",
            auth: {
                user: 'rohityada128@gmail.com',
                pass: 'ykreqgfylypuajew'
            }
        });
        const mailData = {
            from: '"AiToolKit"<rohityada128@gmail.com>',  // sender address
              to: email,   // list of receivers
              subject: 'Password Change OTP',

              text: OTP
            };
    
        transporter.sendMail(mailData, function (err, info) {
             if(err)
                {
                    //console.log(err);
                    return res.status(400).json({success:false,errors: "unable to send email"});
                }
            else{
                    //console.log(info);
                }
                
        });


        res.json({success: true, message: "OTP sent",reciever:email});

    } catch (error) {
        //console.log(`error: ${error}`);
        res.json({success: false, message: "Some error occured.",code:0})
    }

})


module.exports = router;