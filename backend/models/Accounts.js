const mongoose = require('mongoose');

const {Schema} = mongoose;

const AccountSchema = new Schema({
    username :{type:String,required:true},
    email :{type:String,required:true},
    password :{type:String,required:true},
    chatgptapi :{type:String},
    dalleapi :{type:String},
    jukeboxapi :{type:String},
    otp : {type:String}
});

module.exports = mongoose.model('account', AccountSchema);