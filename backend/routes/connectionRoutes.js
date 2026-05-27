//post request send
//post request accept or reject 
//get added requests by userid 
//get send request by userid 
//get recieved request by userid 


let express = require("express");

let connectionRouter = express.Router();

let {sendRequest,acceptRequest,rejectRequest,seeSendRequest,seeRequestRecieved,seeConnections} = require("../controllers/connectionController");

let {authorizeRoute,verifyToken} = require("../middlewares/middlewares");



console.log(typeof(sendRequest))


// connectionRouter.post("/request");

module.exports = connectionRouter;

