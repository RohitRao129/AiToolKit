const express = require("express");
const router = express.Router();
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");


router.post("/imagerequest", async (req, res) => {

    try {
        
        const configuration = new Configuration({
            organization: "org-ZVujI7OqZBl029PPbIJ9nMD9",
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        const response = await openai.Image.create(
            prompt=req.body.query,
            n=1,
            size="512x512"
          )

        let result = await response['data'][0]['url']

        //console.log(JSON.stringify(GeneratedResult[0].candidates[0].content));
        
        return res.json({success: true, result: result});
    
    } catch (err) {
        console.log(err);
        return res.status(400).json({success: false});
    }


})

module.exports = router;
