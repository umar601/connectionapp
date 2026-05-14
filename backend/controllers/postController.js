//add post by user id 
//delete post by userid and post id 
//show post all 
//see post user wise 


let postModel = require("../models/postModel");
let userModel = require("../models/userModel");


const addPost  = async (req,res)=>{

    // try{

    console.log(req.loginUser,req.token)
    
    let newPost = new postModel(
        {
            content:req.body.content,
            owner:req.loginUser
        }
    )

    await newPost.save();

    res.status(200).json({message:"post added successful"});

    // }catch(err){
    //     res.status(500).json({message:"eror in adding post",error:err})
    // }

}


module.exports = {addPost};

