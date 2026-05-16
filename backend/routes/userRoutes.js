// post login (done)
//post sign up (done)


const {userSignup,userLogin} = require("../controllers/userController");
const express = require("express");
const userRouter = express.Router();

userRouter
.post("/signup",userSignup)

userRouter
.post("/login",userLogin);

module.exports = userRouter;