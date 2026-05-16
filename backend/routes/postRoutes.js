//get all post  (done)
//get post by user id  (done)
//post post by user id  (done)
//delete post by user id and post id  (done)

const express = require("express");

const postRouter = express.Router();

const {addPost, showPost,seePostUserWise,deletPost} = require("../controllers/postController");

const jwt = require("jsonwebtoken");


let {authorizeRoute,verifyToken} = require("../middlewares/middlewares");


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

