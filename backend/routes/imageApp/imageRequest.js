const express = require("express");
const router = express.Router();
require('dotenv').config();
const { Configuration, OpenAI} = require("openai");



router.post("/imagerequest", async (req, res) => {
   
    try {
        //const configuration = new Configuration({
           // organization: "org-ZVujI7OqZBl029PPbIJ9nMD9",
           // apiKey: process.env.OPENAI_API_KEY
        //});

        //const openai = new OpenAIApi(configuration);

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
          });

        const response = await openai.images.generate({
            prompt: "a white siamese cat",
            n: 1,
            size: "1024x1024",
          });
          image_url = response.data.data[0].url;

        //console.log(JSON.stringify(GeneratedResult[0].candidates[0].content));
        
        return res.json({success: true, image_url: image_url});
    
    } catch (err) {
        console.log(err);
        return res.status(400).json({success: false});
    }


})

module.exports = router;
