const mongoose = require('mongoose');

const {Schema} = mongoose;

const AccountSchema = new Schema({
    username :{type:String,required:true},
    email :{type:String,required:true},
    password :{type:String,required:true},
    level : {type:Number,default:0}
});

module.exports = mongoose.model('account', AccountSchema);