const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    content:{
        type:String,
        required:true
    },

    likes:{
        type:Number,
        default:0
    },

    comments:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"commentModel"
        }
    ],

    repots:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"repostModel" 
        }
    ],

    shares:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"shareModel"
        }
    ],

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel"
       
    },
    
    createdAt:{
        type:Date,
        default:Date.now()
    }


});

const postModel = mongoose.model("postModel",postSchema);

module.exports = postModel;