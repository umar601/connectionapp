// //add post by user id  (done)
// //delete post by userid and post id  (done)
// //show post all  (done)
// //see post user wise  (done)


// let postModel = require("../models/postModel");
// let userModel = require("../models/userModel");
// let commentModel = require("../models/commentModel");
// const repostModel = require("../models/repostModel");


// //ading post of user 

// const addPost  = async (req,res)=>{

//     try{

//         //storing in data bases

//     let newPost = new postModel(
//         {
//             content:req.body.content,
//             owner:req.loginUser
//         }
//     )

//     await newPost.save();


//     //updating in user

//     let userToAddPost = await userModel.findById(req.loginUser._id);

//     userToAddPost.posts.push(newPost);

//     await userToAddPost.save();


//     res.status(200).json({message:"post added successful"});

//     }catch(err){
//         res.status(500).json({message:"eror in adding post",error:err})
//     }

// }


// //showing all posts of the users 


// let showPost = async(req,res)=>{

//     try{

//         let allPost = await postModel.find({}).populate("owner").populate({
//             path:"comments",
//             populate:{path:"owner"}})

//         res.status(200).json({message:"post fecthed succcessfully",allPost:allPost});


//     }catch(err){

//         res.status(500).json({message:"error in fetching the post ",error:err});
//     }
// }




// let seePostUserWise = async (req,res)=>{

//     try{

//         //fetching post 

//     let userPost = await postModel.find({owner:req.params.userId});


//     //checing if any post by user or not 

//     if(userPost<=0){

//         res.status(200).json({message:"no post yet ",});

//     }

//     //sending post

//     res.status(200).json({message:"fetched successfully ",userPost:userPost});

//     }catch(err){

//         res.status(500).json({message:"eror in id or something can fetch post ",error:err});
//     }
// }





// let deletPost = async (req,res)=>{

//     //deleting post 

//     try{

    
//     let postToDelete = await postModel.findOneAndDelete({_id:req.params.postId,owner:req.params.userId});

//     if(!postToDelete){

//         return res.status(500).json({message:"post not found or user is not authorizee"})
//     }



//     //deleting from user 

//     let postOwner = await userModel.findOneAndUpdate(
//         {_id:req.params.userId},
//         {$pull:{posts:req.params.postId}}  
//          //pull is used to remove something from array first argument is array name ans second is which to match
//     )

//     if(!postOwner){
        
//         return res.status(500).json({message:"some error in user"})

//     }


//     //deleting all commenst from user when post delete

//     let  deletedComment = await commentModel.find({post:postToDelete._id})

//     // console.log(deletedComment)

//     for (i=0;i<deletedComment.length;i++){

//         await userModel.findOneAndUpdate(
//             {
//             _id:req.loginUser._id
//             },
//             {$pull:{comments:deletedComment[i]._id}}
//         )
//     }



//     //deleting all comments from comments when post delete

//     await commentModel.deleteMany({post:postToDelete._id});

//     //deleting reposts

//     await repostModel.deleteMany({

//         post:req.params.postId
//     })

//     await userModel.findOneAndUpdate(

//         {_id:req.params.userId},
//         {$pull:{reposts:req.params.postId}}
//     )


//     res.status(200).json({message:"post deleted successfully"});

//     }catch(err){

//         res.status(500).json({message:"error in deleteing post"})
//     }

//     //these are still remaining

//     //remove all reposts (done)

    
// }


// let updatePost = async (req,res) =>{

//     // try{

//     // console.log(req.params)

//         let updatepost = await postModel.findByIdAndUpdate(
//             req.params.postId,
//             {likes:req.body.likes}
            
//         )

//         if(!updatepost){

//             res.status(404).json({message:"post not found"})

//         }

//         res.status(200).json({message:"updated sucessfully"})




//     // }catch(err){

//     //     res.status(500).json({message:"error in updating post",error:err})

//     // }


// }


// module.exports = {addPost,showPost,seePostUserWise,deletPost,updatePost};


// postController.js - COMPLETE FIXED VERSION
let postModel = require("../models/postModel");
let userModel = require("../models/userModel");
let commentModel = require("../models/commentModel");
const repostModel = require("../models/repostModel");

// ✅ FIXED: Add post
const addPost = async (req, res) => {
    try {
        let newPost = new postModel({
            content: req.body.content,
            owner: req.loginUser.id  // ✅ FIXED
        });

        await newPost.save();

        let userToAddPost = await userModel.findById(req.loginUser.id);  // ✅ FIXED
        userToAddPost.posts.push(newPost._id);
        await userToAddPost.save();

        res.status(200).json({ message: "post added successful" });
    } catch (err) {
        res.status(500).json({ message: "error in adding post", error: err.message });
    }
}

// ✅ No changes needed
const showPost = async (req, res) => {
    try {
        let allPost = await postModel.find({})
            .populate("owner")
            .populate({
                path: "comments",
                populate: { path: "owner" }
            });

        res.status(200).json({ 
            message: "post fetched successfully", 
            allPost: allPost 
        });
    } catch (err) {
        res.status(500).json({ message: "error in fetching the post ", error: err });
    }
}

// ✅ No changes needed
const seePostUserWise = async (req, res) => {
    try {
        let userPost = await postModel.find({ owner: req.params.userId });

        if (userPost.length === 0) {
            return res.status(200).json({ message: "no post yet" });
        }

        res.status(200).json({ 
            message: "fetched successfully", 
            userPost: userPost 
        });
    } catch (err) {
        res.status(500).json({ message: "error fetching post", error: err });
    }
}

// ✅ FIXED: Delete post
const deletPost = async (req, res) => {
    try {
        let postToDelete = await postModel.findOneAndDelete({
            _id: req.params.postId,
            owner: req.loginUser.id  // ✅ FIXED
        });

        if (!postToDelete) {
            return res.status(403).json({ message: "post not found or user is not authorized" });
        }

        // Remove from user's posts
        await userModel.findOneAndUpdate(
            { _id: req.loginUser.id },  // ✅ FIXED
            { $pull: { posts: req.params.postId } }
        );

        // Delete all comments from user
        let deletedComments = await commentModel.find({ post: postToDelete._id });
        for (let comment of deletedComments) {
            await userModel.findOneAndUpdate(
                { _id: req.loginUser.id },  // ✅ FIXED
                { $pull: { comments: comment._id } }
            );
        }

        // Delete all comments from comment collection
        await commentModel.deleteMany({ post: postToDelete._id });

        // Delete reposts
        await repostModel.deleteMany({ post: req.params.postId });
        await userModel.findOneAndUpdate(
            { _id: req.loginUser.id },  // ✅ FIXED
            { $pull: { reposts: req.params.postId } }
        );

        res.status(200).json({ message: "post deleted successfully" });
    } catch (err) {
        console.error('Delete post error:', err);
        res.status(500).json({ message: "error in deleting post", error: err.message });
    }
}

// ✅ FIXED: Update post
const updatePost = async (req, res) => {
    try {
        let updatepost = await postModel.findByIdAndUpdate(
            req.params.postId,
            { likes: req.body.likes },
            { new: true }  // ✅ FIXED: Return updated document
        );

        if (!updatepost) {
            return res.status(404).json({ message: "post not found" });
        }

        res.status(200).json({ 
            message: "updated successfully",
            post: updatepost 
        });
    } catch (err) {
        res.status(500).json({ message: "error in updating post", error: err.message });
    }
}

module.exports = { addPost, showPost, seePostUserWise, deletPost, updatePost };