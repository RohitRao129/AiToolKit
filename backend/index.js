const express = require('express');
require("dotenv").config();
const dbConnect = require('./DbConnect');


const PORT = process.env.PORT;

const app =express();
app.use(express.json());
dbConnect();

app.get('/', (req,res)=>{
    res.send('this is Home');
})

//Routes Below
app.use("/", require("./routes/SignUp"));




app.listen(PORT ,()=>{
    console.log(`app listening to ${PORT}`);
})

