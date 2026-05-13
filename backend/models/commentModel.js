const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({

    contnet:{
        type:String,
        required:true
    },

    likes:{
        type:Number,
        default:0
    },

    owner:{
        type:mongoose.Schema.types.ObjectId,
        ref:"userModel"
       
    },

    post:{
        type:mongoose.Schema.types.ObjectId,
        ref:"postModel"
       
    },

    createdAt:{
        type:Date,
        default:Date.now()
    }


});

const commentModel = mongoose.model("commentModel",commentSchema);

module.exports = commentModel;