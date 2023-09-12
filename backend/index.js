const express = require('express');

const app =express();

const port =5000;

app.get('/', (req,res)=>{
    res.send('HelloWorld');
})

app.listen(port ,()=>{
    console.log(`app listening to ${port}`);
})