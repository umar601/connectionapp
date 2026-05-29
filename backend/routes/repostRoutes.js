//post repost  by post id and user id (done)
//delete repost by post id and user id  (done)
//get repost user wise  (done)


const express = require("express");

const repostRouter = express.Router();

const { repost,removeRepost,seeRepost } = require("../controllers/repostController");

let {authorizeRoute,verifyToken} = require("../middlewares/middlewares");


repostRouter
.post("/repost",verifyToken,authorizeRoute,repost)

repostRouter
.delete("/repost",verifyToken,authorizeRoute,removeRepost)

repostRouter
.get("/repost/:userId",verifyToken,authorizeRoute,seeRepost)

module.exports = repostRouter;
