const express = require("express");
const router = express.Router();
require('dotenv').config();
const {DiscussServiceClient} = require("@google-ai/generativelanguage");
const {GoogleAuth} = require("google-auth-library");
const {body} = require("express-validator");


router.post("/imagerequest", async (req, res) => {

    try {
        const MODEL_NAME = "models/chat-bison-001";
        const API_KEY = process.env.API_KEY;

        const client = new DiscussServiceClient({authClient: new GoogleAuth().fromAPIKey(API_KEY)});

        const GeneratedResult = await client.generateMessage({
            model: MODEL_NAME, // Required. The model to use to generate the result.
            temperature: 0.5, // Optional. Value `0.0` always uses the highest-probability result.
            candidateCount: 1, // Optional. The number of candidate results to generate.
            prompt: { // optional, preamble context to prime responses
                context: req.body.context,
                // Optional. Examples for further fine-tuning of responses.
                examples: [],
                // Required. Alternating prompt/response messages.
                messages: [
                    {
                        content: req.body.query
                    }
                ]
            }
        });

        let result = await GeneratedResult[0].candidates[0].content;

        //console.log(JSON.stringify(GeneratedResult[0].candidates[0].content));
        
        return res.json({success: true, result: result});
    
    } catch (err) {
        //console.log(err);
        return res.status(400).json({success: false});
    }


})

module.exports = router;
