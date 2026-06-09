// post login (done)
//post sign up (done)


const {userSignup,userLogin,getLoginUser} = require("../controllers/userController");
const express = require("express");
const userRouter = express.Router();
const { verifyToken } = require("../middlewares/middlewares");

userRouter
.post("/signup",userSignup)

userRouter
.post("/login",userLogin);

userRouter.get("/me",verifyToken,getLoginUser);



module.exports = userRouter;