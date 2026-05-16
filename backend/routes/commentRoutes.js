//post comment by postid and user id  (done)
//delete comment by post id and user id  (done)
//get commnet by post id  (done)

let express = require("express");

let commentRouter = express.Router();

let {addComment,seeCommentPostWise,deleteComment} = require("../controllers/commentController");

let {authorizeRoute,verifyToken} = require("../middlewares/middlewares");


commentRouter
.post("/post/comment/:userId/:postId",verifyToken,addComment)


// seeCommentPostWise

commentRouter
.get("/post/comment/:postId/",verifyToken,seeCommentPostWise)


// deleteComment


commentRouter
.delete("/post/comment/:userId/:commentId",verifyToken,authorizeRoute,deleteComment)

module.exports = commentRouter;