// //add comment  (done)
// //delete comment  (done)
// //see comment post wise (done)


// let commentModel = require("../models/commentModel");
// let postModel = require("../models/postModel");
// let userModel = require("../models/userModel");


// let addComment = async(req,res)=>{



//     //checking weather the user or post found or not 
//     let postToaddComment = await postModel.findById(req.params.postId);

//     let userToAddComment = await userModel.findById(req.loginUser._id);  //need to check weather the user is login or not


//     // if not found send error

//     if(!postToaddComment||!userToAddComment){

//         return res.status(500).json({message:"something wrong in post or user "});
//     }

//     //adding comment 

//     let commentToAdd = await commentModel.insertOne(
//         {
//             content:req.body.content,
//             owner:req.loginUser._id,
//             post:postToaddComment._id
//         }
//     )


//     //updating comment in user and post 

//     postToaddComment.comments.push(commentToAdd);
//     await postToaddComment.save();

//     userToAddComment.comments.push(commentToAdd);
//     await userToAddComment.save();

//     res.status(200).json({message:"comment added successfully"})



// }


// let seeCommentPostWise = async(req,res)=>{

//     try{

//     let post = await postModel.findById(req.params.postId);

//     if(!post){

//         return res.status(500).json({message:"some error in finding the post",});
//     }

//     let postComment = await commentModel.find({post:req.params.postId});

    

//     if(postComment.length>0){
         
//         return res.status(200).json({message:"comments fetched scucessfuly",postComment:postComment});

//     }else{

//         return res.status(200).json({message:"not comments yet",postComment:postComment});


//     }


//     }catch(err){

//         res.status(500).json({message:"some error in fetching post wise comment",error:err});
//     }
// }


// let deleteComment = async(req,res)=>{

//     //post/comment/commentid

//     // console.log("delete comment called");

//     try{


//         //checking weather comment exit or not 

//         // console.log(req.params.commentId)

//     let commentToDelete = await commentModel.findById(req.params.commentId);

//     if(!commentToDelete){

//         return res.status(404).json({message:"something wrong in finding comment"});
//     }

//     //find post and user to update

//     let postToRemoveComment = await postModel.findById(commentToDelete.post);

//     let userToRemoveComment = await userModel.findById(commentToDelete.owner);

//     if(!postToRemoveComment||!userToRemoveComment){

//         return res.status(404).json({message:"something wrong in finding post and user"});
//     }


//     //deleteing comment


//     await commentModel.findByIdAndDelete(req.params.commentId);


//     //updating user and post 

//     await userModel.findOneAndUpdate(
//         {
//         _id:userToRemoveComment._id
//         },
//         {
//          $pull:{comments:commentToDelete.id}  
//         }
//     )

//     await postModel.findOneAndUpdate(
//         {
//         _id:postToRemoveComment._id
//         },
//         {
//          $pull:{comments:commentToDelete._id}  
//         }
//     )


//     // console.log(postToRemoveComment)

//     // console.log(userToRemoveComment)


//     // if not found send error

   


//     res.status(200).json({message:"comment Deleted Sucessfully"});



//     }catch(err){

//         console.log("errooro")

//         res.status(500).json({message:"some error in deleteing the comments",err,err});
//     }
// }


// module.exports = {addComment,seeCommentPostWise,deleteComment}

// commentController.js - COMPLETE FIXED VERSION
let commentModel = require("../models/commentModel");
let postModel = require("../models/postModel");
let userModel = require("../models/userModel");

// ✅ FIXED: Add comment
const addComment = async (req, res) => {
    try {
        // ✅ FIXED: Use req.loginUser.id (not _id)
        let postToaddComment = await postModel.findById(req.params.postId);
        let userToAddComment = await userModel.findById(req.loginUser.id);

        if (!postToaddComment || !userToAddComment) {
            return res.status(404).json({ message: "something wrong in post or user" });
        }

        // ✅ FIXED: Use new commentModel() instead of insertOne
        let commentToAdd = new commentModel({
            content: req.body.content,
            owner: req.loginUser.id,  // ✅ FIXED: Use .id
            post: postToaddComment._id
        });

        await commentToAdd.save();

        // Update post and user
        postToaddComment.comments.push(commentToAdd._id);
        await postToaddComment.save();

        userToAddComment.comments.push(commentToAdd._id);
        await userToAddComment.save();

        res.status(200).json({ 
            message: "comment added successfully",
            comment: commentToAdd 
        });
    } catch (err) {
        console.error('Add comment error:', err);
        res.status(500).json({ 
            message: "error in adding comment", 
            error: err.message 
        });
    }
}

// ✅ No changes needed (but improved error handling)
const seeCommentPostWise = async (req, res) => {
    try {
        let post = await postModel.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }

        let postComment = await commentModel.find({ post: req.params.postId })
            .populate('owner', 'username');  // ✅ Added populate for better response

        if (postComment.length > 0) {
            return res.status(200).json({ 
                message: "comments fetched successfully", 
                postComment: postComment 
            });
        } else {
            return res.status(200).json({ 
                message: "no comments yet", 
                postComment: [] 
            });
        }
    } catch (err) {
        console.error('Fetch comments error:', err);
        res.status(500).json({ 
            message: "some error in fetching post wise comment", 
            error: err.message 
        });
    }
}

// ✅ FIXED: Delete comment
const deleteComment = async (req, res) => {
    try {
        let commentToDelete = await commentModel.findById(req.params.commentId);

        if (!commentToDelete) {
            return res.status(404).json({ message: "comment not found" });
        }

        // ✅ FIXED: Check if user is the owner of the comment
        if (commentToDelete.owner.toString() !== req.loginUser.id) {
            return res.status(403).json({ message: "not authorized to delete this comment" });
        }

        // Find post and user to update
        let postToRemoveComment = await postModel.findById(commentToDelete.post);
        let userToRemoveComment = await userModel.findById(commentToDelete.owner);

        if (!postToRemoveComment || !userToRemoveComment) {
            return res.status(404).json({ message: "post or user not found" });
        }

        // Delete comment
        await commentModel.findByIdAndDelete(req.params.commentId);

        // Update user - remove comment from user's comments array
        await userModel.findOneAndUpdate(
            { _id: userToRemoveComment._id },
            { $pull: { comments: commentToDelete._id } }
        );

        // Update post - remove comment from post's comments array
        await postModel.findOneAndUpdate(
            { _id: postToRemoveComment._id },
            { $pull: { comments: commentToDelete._id } }
        );

        res.status(200).json({ message: "comment deleted successfully" });
    } catch (err) {
        console.error('Delete comment error:', err);
        res.status(500).json({ 
            message: "some error in deleting the comment", 
            error: err.message 
        });
    }
}

module.exports = { addComment, seeCommentPostWise, deleteComment };