const express = require('express');
require("dotenv").config();
const dbConnect = require('./DbConnect');


const PORT = process.env.PORT;

const app =express();
app.use(express.json());
dbConnect();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.get('/', (req,res)=>{
    res.send('this is Home');
})

//Routes Below
app.use("/", require("./routes/authentication/SignUp"));
app.use("/", require("./routes/authentication/Login"));
app.use("/", require("./routes/authentication/SendOtp"));
app.use("/", require("./routes/authentication/ChangePassword"));

app.use("/", require("./routes/chatApp/chatRequest"));
app.use("/", require("./routes/chatApp/FetchAllChats"));
app.use("/", require("./routes/chatApp/StartOrSaveChat"));
app.use("/", require("./routes/chatApp/LoadChat"));
app.use("/", require("./routes/chatApp/DeleteChat"));

app.use("/", require("./routes/imageApp/imageRequest"));



app.listen(PORT ,()=>{
    console.log(`app listening to ${PORT}`);
})

