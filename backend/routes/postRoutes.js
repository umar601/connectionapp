//get all post
//get post by user id 
//post post by user id 
//delete post by user id and post id 

const express = require("express");

const postRouter = express.Router();

const {addPost} = require("../controllers/postController");

const jwt = require("jsonwebtoken");


let verifyToken = async(req,res)=>{


}


postRouter
.post("/post",addPost);


module.exports = postRouter;
