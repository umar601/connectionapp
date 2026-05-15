const express = require("express");
const cookieParser = require("cookie-parser");

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


module.exports = middlewares;