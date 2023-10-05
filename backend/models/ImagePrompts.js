const mongoose = require('mongoose');


const {Schema} = mongoose;

const ImagePromptSchema = new Schema({
    owner :{type:mongoose.Schema.Types.ObjectId ,ref:'account'},
    tittle : {type:String, default:"saved chat"},
    messages : [{
        sender: {type:String},
        text: {type:String}
    }]
});

module.exports = mongoose.model('imagePrompt', ImagePromptSchema);