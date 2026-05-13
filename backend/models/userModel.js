const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    posts:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"connectionModel" 
        }
    ],

    comments:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"commentModel"
        }
    ],

    reposts:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"repostModel"
        }
    ],

    connections:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"connectionModel"    
        }
    ],

    shares:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"shareModel" 
        }
    ],
    
    profilePic:{
        type:String
        //we add default url here later
    }


})


const userModel = mongoose.model("userModel",userSchema);  //first is model name and second is schema name


module.exports = userModel;