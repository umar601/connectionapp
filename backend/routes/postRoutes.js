//get all post  (done)
//get post by user id  (done)
//post post by user id  (done)
//delete post by user id and post id  (done)

const express = require("express");

const postRouter = express.Router();

const {addPost, showPost,seePostUserWise,deletPost} = require("../controllers/postController");

const jwt = require("jsonwebtoken");


let verifyToken = async(req,res,next)=>{

    // console.log(req.token)
    // console.log(req.loginUser)

    //if token not exit means the user is not verifie


    try{

    if(!req.token){

        res.status(500).json({message:"not verified login first"});

    }
    else{

    const token = req.token;

    //verifyingtoken
    
    let decoded = jwt.verify(token,"secretKey");

    // res.status(200).json({message:"verified"})
    next();

    }

    }catch(err){
        res.status(500).json({message:"erro in token verifying middleware",error,err});
    }

    
}

let authorizeRoute = (req,res,next)=>{

    try{

        let loginUser = req.loginUser;

        if(loginUser._id==req.params.userId){

            next()
        }else{
            res.status(500).json({message:"user is not authorize to see post"});
        }


    }catch(err){
        res.status(500).json({message:"some error in authorization",error:err});
    }
}


//add and show post


postRouter
.route("/post")
.post(verifyToken,addPost)
.get(verifyToken,showPost)

//see user wise post 

postRouter 
.get("/post/:userId",verifyToken,authorizeRoute,seePostUserWise)

postRouter
.delete("/post/:userId/:postId",verifyToken,authorizeRoute,deletPost);




module.exports = postRouter;

