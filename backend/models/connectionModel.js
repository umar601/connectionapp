const mongoose = require("mongoose");

const connectionShema = new mongoose.Schema({

    sendTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel",
        required:true
    },

    sendBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel",
        required:true
    },

    status:{
        type:String,
        enum:["pending","rejected","accepted"],
        default:"pending"  
    },

    createdAt:{
        type:Date,
        default:Date.now()
    }


});

const connectionModel = mongoose.model("connectionModel",connectionShema);

module.exports = connectionModel;