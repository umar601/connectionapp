//sign up
//login

const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSignup = async (req,res)=>{  
    
    //automatically login after signup thats why we are generating token here 


    //checking account already exist or not 


    // console.log(req.body)
    // res.send("goog")
    try{

    let isAccountFound = await userModel.findOne({username:req.body.username});

    //if account is not found then 

    if(!isAccountFound){  //find return array

        const salt = await bcrypt.genSalt(10);
        const hashPassword  = await bcrypt.hash(req.body.password,salt);


        //creating account

        let newUser  = new userModel(
            {
                username:req.body.username,
                password:hashPassword
            }
        )

        await newUser.save();

        //generating token data 

        let tokenData = {
            id : newUser._id,
            username: newUser.username
        }

        //generating token 

        let generatedToken = jwt.sign(
            {
                data:tokenData

            },
            "secretKey",
            {expiresIn:"1h"}
        )

        //storing in cookie

        res.cookie("token",generatedToken,{
            httpOnly:true,
            maxAge:60*60*1000
        })

        res.cookie("currentUser",newUser,{
                httpOnly:true,
                maxAge:60*60*1000           //for one hour 
        })


        res.status(201).json({message:"account created successfully"});


    }
    else{
        
        res.status(409).json({message:"account already exist"});
    }

    }catch(err){
        res.status(500).json({message: "Server error", err: err.message})
    
    }  


}


const userLogin  = async (req,res) => {

    try{

        //first checking weather the user exist or not 

        let isUserFound = await userModel.findOne({username:req.body.username});

        //if user exist 


        if(isUserFound){

            //matching the password 

            let isPasswordMatched = await bcrypt.compare(req.body.password,isUserFound.password);

            if(isPasswordMatched){

            //making the token 

            let tokenData = {
                id:isUserFound._id,
                username:req.body.username
            }


            //generating token 


            let generatedToken = jwt.sign(
                {
                    data:tokenData
                },
                "secretKey",
                {
                    expiresIn:"1h"
                }
            )

            //storing token in cookie 

            res.cookie("token",generatedToken,{
                httpOnly:true,
                maxAge:60*60*1000           //for one hour 
            })

            res.cookie("currentUser",isUserFound,{
                httpOnly:true,
                maxAge:60*60*1000           //for one hour 
            })
            
            console.log(req.cookies)

            // login succesfull

            res.status(200).json({message:"user login successful",token:generatedToken});

            }   
            
        }else{

            res.status(500).json({message:"user not found"});


        }


    }catch(err){
        res.status(500).json({message:"some error in login ",error:err.message});
    }
    
}




module.exports = {userSignup,userLogin};