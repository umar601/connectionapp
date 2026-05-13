const mongoose = require("mongoose");

const connectionShema = new mongoose.Schema({

    sendTo:{
        type:mongoose.Schema.types.ObjectId,
        ref:"userModel",
        required:true
    },

    SendBy:{
        type:mongoose.Schema.types.ObjectId,
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