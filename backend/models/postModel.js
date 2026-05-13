const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    contnet:{
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
        types:mongoose.Schema.types.ObjectId,
        ref:"shareModel"
        }
    ],

    owner:{
        types:mongoose.Schema.types.ObjectId,
        ref:"userModel"
       
    },
    
    createdAt:{
        type:Date,
        default:Date.now()
    }


});

const postModel = mongoose.model("postModel",postSchema);

module.exports = postModel;