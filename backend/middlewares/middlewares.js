// const express = require("express");
// const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken")
// const cors = require("cors");

// const middlewares = (app)=>{


//     app.use(express.json());
//     app.use(express.urlencoded({ extended: true }));
//     app.use(cookieParser());
//     app.use(cors({
//         origin:true,
//         credentials:true

//     }))

//     // console.log("middleware is working")
    

//     app.use((req,res,next)=>{

//     // console.log(req.cookies.currentUser)
//     // console.log(req.cookies.token)

//         req.loginUser = req.cookies.currentUser;
//         req.token  = req.cookies.token; 
//         next();
//     });


//     // console.log(req.token)
//     // console.log(req.loginUser)



// }




// let verifyToken = async(req,res,next)=>{

//     // console.log(req.token)
//     // console.log(req.loginUser)

//     //if token not exit means the user is not verifie

//     // console.log("verify token called")

//     // console.log(req.method, req.originalUrl);


//     try{


//     if(!req.token){

//         res.status(500).json({message:"not verified login first"});

//     }
//     else{

//     const token = req.token;

//     // console.log(token)

//     //verifyingtoken
    
//     let decoded = jwt.verify(token,"secretKey");

//     // res.status(200).json({message:"verified"})
//     next();

//     }

//     }catch(err){
//         // next(err);
//         res.status(500).json({message:"erro in token verifying middleware",error,err});
//     }

    
// }

// let authorizeRoute = (req,res,next)=>{


//     // console.log("authorize route called")

//     // console.log(req.method, req.originalUrl);

//     try{

//         let loginUser = req.loginUser;

//         // console.log(req.body.userId)
//         // console.log(loginUser)
        

//         if(loginUser._id==req.params.userId||loginUser._id==req.body.userId){

//             // console.log("matched")

//             next()
//         }else{
//             // console.log("not")
//             res.status(500).json({message:"user is not authorize "});
//         }


//     }catch(err){

//         // next(err);
//         console.log(err)
//         res.status(500).json({message:"some error in authorization",error:err});
//     }
// }


// module.exports = {middlewares,authorizeRoute,verifyToken};

const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const middlewares = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    
    // ✅ FIXED: Use your actual frontend URL
    app.use(cors({
        origin: "https://connectionapp-lilac.vercel.app", // ← YOUR VERCELL URL
        credentials: true
    }));
}

// ✅ NEW verifyToken - Gets user from JWT only
const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Login first"
            });
        }

        const decoded = jwt.verify(token, "secretKey");
        req.loginUser = decoded.data; // { id, username }

        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token",
            error: err.message
        });
    }
}

// ✅ NEW authorizeRoute - Uses req.loginUser.id
const authorizeRoute = (req, res, next) => {
    if (
        req.loginUser.id == req.params.userId ||
        req.loginUser.id == req.body.userId
    ) {
        return next();
    }

    return res.status(403).json({
        message: "Not authorised"
    });
}

module.exports = { middlewares, authorizeRoute, verifyToken };