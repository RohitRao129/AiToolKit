const mongoose = require("mongoose");

const DBCONNECTSTRING = process.env.DBCONNECTSTRING;

const dbConnect = async () => {

    try{
        const conn = await mongoose.connect(DBCONNECTSTRING);
        console.log(`Database connected to host : ${conn.connection.host}`);
    }
    catch(error){
        console.log(`Error : ${error}`);
    }
}

module.exports =dbConnect;