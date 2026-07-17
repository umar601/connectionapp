//post request send (done)
//post request accept or reject  (done)
//get added requests by userid  (done)
//get send request by userid  (done)
//get recieved request by userid  (done)


let express = require("express");

let connectionRouter = express.Router();

let {sendRequest,acceptRequest,rejectRequest,seeSendRequest,seeRequestRecieved,seeConnections,getAllUsers} = require("../controllers/connectionController");

let {authorizeRoute,verifyToken} = require("../middlewares/middlewares");






connectionRouter.post("/request",verifyToken,authorizeRoute,sendRequest);

connectionRouter.post("/request/accept",verifyToken,authorizeRoute,acceptRequest);

connectionRouter.post("/request/reject",verifyToken,authorizeRoute,rejectRequest);

connectionRouter.get("/request/send/:userId",verifyToken,authorizeRoute,seeSendRequest);

connectionRouter.get("/request/recieved/:userId",verifyToken,authorizeRoute,seeRequestRecieved);

connectionRouter.get("/request/connection/:userId",verifyToken,authorizeRoute,seeConnections);

connectionRouter.get("/home/user/:userId",verifyToken,authorizeRoute,getAllUsers);

module.exports = connectionRouter;

