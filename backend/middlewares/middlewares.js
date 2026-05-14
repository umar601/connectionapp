const express = require("express");
const cookieParser = require("cookie-parser");

const middlewares = (app)=>{


    app.use(express.json());
    app.use(cookieParser())

    app.use((req,res,next)=>{

        req.loginUser = req.cookies.currentUser;
        req.token  = req.cookies.token; 

        // console.log(req.token)


        next();
    });



}


module.exports = middlewares;