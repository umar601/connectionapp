//repost post (done)
//show repost user wise (done)
//remove repost (done)

const repostModel = require("../models/repostModel");

const postModel = require("../models/postModel");

const userModel = require("../models/userModel.js");

let repost = async (req, res) => {
  //checking weather the user and post exist

  try {
    let post = await postModel.findById(req.body.postId);

    let user = await userModel.findById(req.body.userId);

    if (!post || !user) {
      res.status(500).json({ message: "either post or user not found" });
    } else {

        //checing weather alread repoted or not 

      let isReposted = await repostModel.findOne({
        post: req.body.postId,
        repostBy: req.body.userId,
      });
      if (isReposted) {
        return res.status(500).json({ message: "alredy resposted" });
      }
      await repostModel.insertOne({
        post: post,
        repostBy: user,
      });

      //saving in the user who reposted

      user.reposts.push(post);

      await user.save();

      res.status(200).json({ message: "reposted sucessfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "some error in repost" });
  }
};

let removeRepost = async (req, res) => {
  try {
    let post = await postModel.findById(req.body.postId);

    let user = await userModel.findById(req.body.userId);

    if (!post || !user) {
      res
        .status(500)
        .json({ message: "either post or user not found", err: err });
    } else {
      //removing from repost
    
    let isReposted = await repostModel.findOne({
        post: req.body.postId,
        repostBy: req.body.userId,
    });
    if (isReposted) {
       

      await repostModel.findOneAndDelete({
        post: req.body.postId,
      });

      //removing from user

      await userModel.updateOne(
        { _id: req.body.userId },
        { $pull: { reposts: req.body.postId } },
      );

      res.status(200).json({ message: "repost removed successfully" });
    }
    else{        
        res.status(500).json({ message: "post is not reposted" });
    }
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "some error in deleteing repost", err: err });
  }
};

let seeRepost = async (req, res) => {
  try {
    let user = await userModel.findById(req.params.userId);

    if (!user) {
      res.status(500).json({ message: "user not found", err: err });
    } else {
      let reposts = user.reposts;

      res
        .status(200)
        .json({ message: "reposted successfully", repost: reposts });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "some error in fethcing reposts ", err: err });
  }
};

module.exports = { repost,removeRepost,seeRepost };
