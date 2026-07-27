// //sign up
// //login

// const userModel = require("../models/userModel");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// const userSignup = async (req,res)=>{  
    
//     //automatically login after signup thats why we are generating token here 


//     //checking account already exist or not 

//     try{

//     let isAccountFound = await userModel.findOne({username:req.body.username});

//     //if account is not found then 

//     if(!isAccountFound){ 

//         const salt = await bcrypt.genSalt(10);
//         const hashPassword  = await bcrypt.hash(req.body.password,salt);


//         //creating account

//         let newUser  = new userModel(
//             {
//                 username:req.body.username,
//                 password:hashPassword
//             }
//         )

//         await newUser.save();

//         //generating token data 

//         let tokenData = {
//             id : newUser._id,
//             username: newUser.username
//         }

//         //generating token 

//         let generatedToken = jwt.sign(
//             {
//                 data:tokenData

//             },
//             "secretKey",
//             {expiresIn:"1h"}
//         )

//         //storing token in cookie

//         res.cookie("token",generatedToken,{
//             httpOnly:true,
//             maxAge:2*60*1000 
//         })

//         //storing user in toknen

//         res.cookie("currentUser",newUser,{
//                 httpOnly:true,
//                 maxAge:2*60*1000           
//         })


//         res.status(200).json({message:"account created successfully",id:newUser._id,username:newUser.username});


//     }
//     else{
        
//         res.status(409).json({message:"account already exist"});
//     }

//     }catch(err){
//         res.status(500).json({message: "Server error", err: err.message})
    
//     }  


// }


// const userLogin  = async (req,res) => {

//     try{

//         // console.log(req.body.username,req.body.password)

//         //first checking weather the user exist or not 

//         let isUserFound = await userModel.findOne({username:req.body.username});

//         // console.log(isUserFound)

//         //if user exist 


//         if(isUserFound){

//             //matching the password 

//             let isPasswordMatched = await bcrypt.compare(req.body.password,isUserFound.password);

//             if(isPasswordMatched){
        

//             //making the token 

//             let tokenData = {
//                 id:isUserFound._id,
//                 username:req.body.username
//             }


//             //generating token 


//             let generatedToken = jwt.sign(
//                 {
//                     data:tokenData
//                 },
//                 "secretKey",
//                 {
//                     expiresIn:"1h"
//                 }
//             )

//             //storing token in cookie 

//             res.cookie("token",generatedToken,{
//                 httpOnly:true,
//                 maxAge:2*60*1000            
//             })

//             //storing user in cookie

//             res.cookie("currentUser",isUserFound,{
//                 httpOnly:true,
//                 maxAge:2*60*1000        
//             })

           
//             // login succesfull

//             res.status(200).json({message:"user login successful",token:generatedToken,id:isUserFound._id,username:isUserFound.username});

//             }else{

//             res.status(401).json({message:"password is wrong"});

//             }
            
//         }else{

//             res.status(404).json({message:"user not found"});


//         }


//     }catch(err){
//         res.status(500).json({message:"some error in login ",error:err});
//     }
    
// }

// //this is used to get the login user 

// const getLoginUser  = async ( req,res) =>{

//     try {

//         let loginUser = await userModel.findById(req.loginUser._id).select("-password"); //fetch user but not his pasword 

//         if(loginUser){

//             res.status(200).json({messgae:"user found",user:loginUser});
//         }else{

//             res.status(404).json({message:"user not found"});
//         }


//     }catch(err){

//         res.status(500).json({message:"some error occured ",err:err});
//     }
// }


// module.exports = { userSignup, userLogin,getLoginUser}; 


// authController.js - FIXED VERSION
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSignup = async (req, res) => {
    try {
        let isAccountFound = await userModel.findOne({ username: req.body.username });

        if (!isAccountFound) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);

            let newUser = new userModel({
                username: req.body.username,
                password: hashPassword
            });

            await newUser.save();

            let tokenData = {
                id: newUser._id,
                username: newUser.username
            };

            let generatedToken = jwt.sign(
                { data: tokenData },
                "secretKey",
                { expiresIn: "7d" } // ✅ CHANGE: 1h → 7d
            );

            // ✅ FIX 1: Store token with longer expiry
            res.cookie("token", generatedToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000 // ✅ CHANGE: 2 minutes → 7 days
            });

            // ✅ FIX 2: Remove password before storing in cookie
            const userWithoutPassword = {
                _id: newUser._id,
                username: newUser.username
            };

            // ✅ FIX 3: Make currentUser readable by frontend
            res.cookie("currentUser", userWithoutPassword, {
                httpOnly: false, // ✅ CHANGE: true → false
                maxAge: 7 * 24 * 60 * 60 * 1000 // ✅ CHANGE: 2 minutes → 7 days
            });

            res.status(200).json({
                message: "account created successfully",
                id: newUser._id,
                username: newUser.username
            });
        } else {
            res.status(409).json({ message: "account already exist" });
        }
    } catch (err) {
        res.status(500).json({ message: "Server error", err: err.message });
    }
}

const userLogin = async (req, res) => {
    try {
        let isUserFound = await userModel.findOne({ username: req.body.username });

        if (isUserFound) {
            let isPasswordMatched = await bcrypt.compare(req.body.password, isUserFound.password);

            if (isPasswordMatched) {
                let tokenData = {
                    id: isUserFound._id,
                    username: req.body.username
                };

                let generatedToken = jwt.sign(
                    { data: tokenData },
                    "secretKey",
                    { expiresIn: "7d" } // ✅ CHANGE: 1h → 7d
                );

                // ✅ FIX 1: Store token with longer expiry
                res.cookie("token", generatedToken, {
                    httpOnly: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000 // ✅ CHANGE: 2 minutes → 7 days
                });

                // ✅ FIX 2: Remove password before storing in cookie
                const userWithoutPassword = {
                    _id: isUserFound._id,
                    username: isUserFound.username
                };

                // ✅ FIX 3: Make currentUser readable by frontend
                res.cookie("currentUser", userWithoutPassword, {
                    httpOnly: false, // ✅ CHANGE: true → false
                    maxAge: 7 * 24 * 60 * 60 * 1000 // ✅ CHANGE: 2 minutes → 7 days
                });

                res.status(200).json({
                    message: "user login successful",
                    // ✅ REMOVED: token from response (it's in cookie now)
                    id: isUserFound._id,
                    username: isUserFound.username
                });
            } else {
                res.status(401).json({ message: "password is wrong" });
            }
        } else {
            res.status(404).json({ message: "user not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "some error in login ", error: err });
    }
}

const getLoginUser = async (req, res) => {
    try {
        let loginUser = await userModel.findById(req.loginUser._id).select("-password");
        if (loginUser) {
            res.status(200).json({ message: "user found", user: loginUser });
        } else {
            res.status(404).json({ message: "user not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "some error occured ", err: err });
    }
}

//

module.exports = { userSignup, userLogin, getLoginUser };




