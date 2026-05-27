const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")

const middlewares = (app)=>{


    app.use(express.json());
    app.use(cookieParser())

    app.use((req,res,next)=>{

        req.loginUser = req.cookies.currentUser;
        req.token  = req.cookies.token; 

         

    
        next();
    });


    // console.log(req.token)
    // console.log(req.loginUser)



}




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

    // console.log(token)

    //verifyingtoken
    
    let decoded = jwt.verify(token,"secretKey");

    // res.status(200).json({message:"verified"})
    next();

    }

    }catch(err){
        // next(err);
        res.status(500).json({message:"erro in token verifying middleware",error,err});
    }

    
}

let authorizeRoute = (req,res,next)=>{

    try{

        let loginUser = req.loginUser;

        // console.log(req.body.userId)
        // console.log(loginUser)

        if(loginUser._id==req.params.userId||loginUser._id==req.body.userId){

            next()
        }else{
            res.status(500).json({message:"user is not authorize "});
        }


    }catch(err){

        // next(err);
        res.status(500).json({message:"some error in authorization",error:err});
    }
}


module.exports = {middlewares,authorizeRoute,verifyToken};