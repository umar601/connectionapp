//add post by user id 
//delete post by userid and post id 
//show post all 
//see post user wise 


let postModel = require("../models/postModel");
let userModel = require("../models/userModel");


//ading post of user 

const addPost  = async (req,res)=>{

    try{

        //storing in data bases

    let newPost = new postModel(
        {
            content:req.body.content,
            owner:req.loginUser
        }
    )

    await newPost.save();


    //updating in user

    let userToAddPost = await userModel.findById(req.loginUser._id);

    userToAddPost.posts.push(newPost);

    await userToAddPost.save();



    res.status(200).json({message:"post added successful"});

    }catch(err){
        res.status(500).json({message:"eror in adding post",error:err})
    }

}


//showing all posts of the users 


let showPost = async(req,res)=>{

    try{

        let allPost = await postModel.find({});

        res.status(200).json({message:"post fecthed succcessfully",allPost:allPost});


    }catch(err){

        res.status(500).json({message:"error in fetching the post ",error:err});
    }
}




let seePostUserWise = async (req,res)=>{

    try{

        //fetching post 

    let userPost = await postModel.find({owner:req.params.userId});


    //checing if any post by user or not 

    if(userPost<=0){

        res.status(200).json({message:"no post yet ",});

    }

    //sending post

    res.status(200).json({message:"fetched successfully ",userPost:userPost});

    }catch(err){

        res.status(500).json({message:"eror in id or something can fetch post ",error:err});
    }
}


let deletPost = async (req,res)=>{

    //deleting post 

    try{

    
    let postToDelete = await postModel.findByIdAndDelete(req.params.postId);

    if(!postToDelete){

        return res.status(500).json({message:"post not found"})
    }



    //deleting from user 

    let postOwner = await userModel.findOneAndUpdate(
        {_id:req.params.userId},
        {$pull:{posts:req.params.postId}}  
         //pull is used to remove something from array first argument is array name ans second is which to match
    )

    if(!postOwner){
        
        return res.status(500).json({message:"some error in user"})

    }

    res.status(200).json({message:"post deleted successfully"});

    }catch(err){

        res.status(500).json({message:"error in deleteing post"})
    }

    //these are still remaining

    // remove all comments
    //remove all reposts 
    //remove all shares

    
}


module.exports = {addPost,showPost,seePostUserWise,deletPost};

